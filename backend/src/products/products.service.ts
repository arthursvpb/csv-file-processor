import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(
    filters: { name?: string; minPrice?: string; maxPrice?: string },
    sort: { sortBy?: string; order?: 'ASC' | 'DESC' },
    pagination: { page: number; limit: number },
  ) {
    const query = this.productRepository.createQueryBuilder('product');
    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / pagination.limit);
    const currentPage = Math.min(pagination.page, totalPages) || 1;

    if (filters.name && filters.name.trim() !== '')
      query.andWhere('product.name ILIKE :name', {
        name: `%${filters.name.trim()}%`,
      });

    if (filters.minPrice)
      query.andWhere('product.price >= :minPrice', {
        minPrice: parseFloat(filters.minPrice),
      });

    if (filters.maxPrice)
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: parseFloat(filters.maxPrice),
      });

    if (sort.sortBy && ['name', 'price', 'expiration'].includes(sort.sortBy))
      query.orderBy(`product.${sort.sortBy}`, sort.order || 'ASC');

    if (!filters.name)
      query.skip((currentPage - 1) * pagination.limit).take(pagination.limit);

    return query.getManyAndCount();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }
}
