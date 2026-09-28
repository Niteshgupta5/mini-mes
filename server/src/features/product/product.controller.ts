import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto, UpdateProductsDto } from './domain';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id')
    id: string,
  ) {
    return await this.productsService.getProductById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductsDto) {
    return await this.productsService.update(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }
}
