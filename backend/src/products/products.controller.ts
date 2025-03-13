import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import * as sanitizeHtml from 'sanitize-html';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sortBy') sortBy: string = 'name',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const filters = {
      name: name ? sanitizeHtml(name.trim()) : '',
      minPrice: minPrice ? sanitizeHtml(minPrice.trim()) : '',
      maxPrice: maxPrice ? sanitizeHtml(maxPrice.trim()) : '',
    };

    const sort = { sortBy: sanitizeHtml(sortBy.trim()), order };
    const pagination = { page: Number(page), limit: Number(limit) };

    const [products, total] = await this.productsService.getAllProducts(
      filters,
      sort,
      pagination,
    );

    return { products, total, page, totalPages: Math.ceil(total / limit) };
  }
}
