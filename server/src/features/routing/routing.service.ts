import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ProductEntity,
  RoutingEntity,
  RoutingOperationEntity,
  WorkCenterEntity,
} from '../../entities';
import { CreateRoutingDto } from './domain';

@Injectable()
export class RoutingService {
  constructor(
    @InjectRepository(RoutingEntity)
    private readonly routingRepo: Repository<RoutingEntity>,
    @InjectRepository(RoutingOperationEntity)
    private readonly opRepo: Repository<RoutingOperationEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(WorkCenterEntity)
    private readonly wcRepo: Repository<WorkCenterEntity>,
  ) {}

  async create(dto: CreateRoutingDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const routing = await this.routingRepo.save(
      this.routingRepo.create({
        version: dto.version,
        product,
        operations: [],
      }),
    );

    const operations: RoutingOperationEntity[] = [];
    for (const op of dto.operations) {
      const workCenter = await this.wcRepo.findOneBy({ id: op.workCenterId });
      if (!workCenter)
        throw new NotFoundException(`Work center ${op.workCenterId} not found`);
      operations.push(
        await this.opRepo.save(
          this.opRepo.create({
            routing,
            workCenter,
            sequence: op.sequence,
            name: op.name,
            idealCycleSeconds: op.idealCycleSeconds,
          }),
        ),
      );
    }

    routing.operations = operations;
    return await this.findOne(routing.id);
  }

  async findAll() {
    return await this.routingRepo.find({
      relations: { product: true, operations: { workCenter: true } },
    });
  }

  async findOne(id: string) {
    const row = await this.routingRepo.findOne({
      where: { id },
      relations: { product: true, operations: { workCenter: true } },
    });
    if (!row) throw new NotFoundException('Routing not found');
    return row;
  }
}
