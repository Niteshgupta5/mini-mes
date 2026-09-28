import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductsDto } from './domain';
import { ProductEntity } from '../../entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    return await this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getProductById(id: string) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateProductsDto) {
    const row = (await this.getProductById(id)) ?? {};
    Object.assign(row, dto);
    return await this.productRepository.save(row);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
