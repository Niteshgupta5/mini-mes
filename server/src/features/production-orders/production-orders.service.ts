import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductionOrderEntity } from '../../entities';
import { CreateProductionOrderDto, ProductionOrderStatus } from './domain';

@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrderEntity)
    private readonly repo: Repository<ProductionOrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateProductionOrderDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');
    return await this.repo.save(
      this.repo.create({
        orderNumber: dto.orderNumber,
        plannedQuantity: dto.plannedQuantity,
        product,
        plannedStart: dto.plannedStart ? new Date(dto.plannedStart) : undefined,
        plannedEnd: dto.plannedEnd ? new Date(dto.plannedEnd) : undefined,
      }),
    );
  }

  async findAll() {
    return await this.repo.find({
      relations: { product: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const row = await this.repo.findOne({
      where: { id },
      relations: { product: true },
    });
    if (!row) throw new NotFoundException('Production order not found');
    return row;
  }

  async release(id: string) {
    const row = await this.findOne(id);
    if (row.status !== ProductionOrderStatus.DRAFT)
      throw new BadRequestException('Only draft orders can be released');
    row.status = ProductionOrderStatus.RELEASED;
    return await this.repo.save(row);
  }
}
