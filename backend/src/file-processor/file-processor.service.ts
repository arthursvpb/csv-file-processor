import * as fs from 'fs';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { parse } from 'fast-csv';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';

import { Product } from '../products/product.entity';
import { ProductDTO } from '../products/dto/product.dto';
import { RedisService } from '../redis/redis.service';
import { ExchangeService } from '../exchange/exchange.service';

@Injectable()
export class FileProcessorService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly redisService: RedisService,
    private readonly exchangeService: ExchangeService,
  ) {}

  async processFile(filePath: string): Promise<string> {
    const redisKey = `upload:${filePath}`;
    await this.redisService.setValue(redisKey, 'processing');

    const results: Product[] = [];
    let exchangeRates: Record<string, number>;

    try {
      exchangeRates = await this.exchangeService.getMultipleExchangeRates([
        'BRL',
        'EUR',
        'GBP',
        'JPY',
        'CAD',
      ]);
    } catch (error) {
      await this.redisService.setValue(redisKey, 'failed');
      throw new BadRequestException(
        `Failed to fetch exchange rates: ${error.message}`,
      );
    }

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parse({ headers: true, delimiter: ';' }))
        .on('error', async (error) => {
          await this.redisService.setValue(redisKey, 'failed');
          reject(
            new BadRequestException(`Error parsing file: ${error.message}`),
          );
        })
        .on('data', async (row) => {
          const product = await this.validateRow(row);
          if (product) {
            product.exchangeRates = Object.fromEntries(
              Object.entries(exchangeRates).map(([currency, rate]) => [
                currency,
                parseFloat((product.price * rate).toFixed(2)),
              ]),
            );
            results.push(product);
          }
        })
        .on('end', async (rowCount: number) => {
          if (results.length === 0) {
            await this.redisService.setValue(redisKey, 'failed');
            return reject(
              new BadRequestException('No valid data found in CSV file.'),
            );
          }

          try {
            await this.productRepository.manager.transaction(
              async (transactionalEntityManager) => {
                for (const product of results) {
                  try {
                    const existingProduct =
                      await transactionalEntityManager.findOne(Product, {
                        where: { name: product.name },
                      });

                    if (!existingProduct) {
                      await transactionalEntityManager.save(Product, product);
                    } else {
                      console.warn(
                        `Skipping duplicate product: ${product.name}`,
                      );
                    }
                  } catch (error) {
                    console.error(
                      `Error saving product: ${product.name}`,
                      error,
                    );
                    throw error;
                  }
                }
              },
            );

            await this.redisService.setValue(redisKey, 'completed');
            resolve(`File processed successfully. Rows processed: ${rowCount}`);
          } catch (error) {
            await this.redisService.setValue(redisKey, 'failed');
            reject(
              new BadRequestException(
                `Error saving products to the database: ${error.message}`,
              ),
            );
          }
        });
    });
  }

  async validateRow(row: any): Promise<Product | null> {
    const { name, price, expiration } = row;

    if (!name || !price || !expiration) {
      console.warn('Skipping invalid row: Missing required fields ->', row);
      return null;
    }

    const productDTO = plainToInstance(ProductDTO, row);
    const errors = await validate(productDTO);

    if (errors.length > 0) {
      console.warn('Skipping invalid row:', row, 'Errors:', errors);
      return null;
    }

    const product = new Product();
    product.name = productDTO.name;
    product.price = productDTO.price;
    product.expiration = new Date(productDTO.expiration);

    return product;
  }
}
