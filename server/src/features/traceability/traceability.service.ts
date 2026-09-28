import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MachineEntity,
  MaterialEntity,
  ProductEntity,
  ProductionOrderEntity,
  TraceabilityRecordEntity,
  WorkOrderEntity,
} from '../../entities';
import { CreateTraceabilityDto } from './domain';

@Injectable()
export class TraceabilityService {
  constructor(
    @InjectRepository(TraceabilityRecordEntity)
    private readonly repo: Repository<TraceabilityRecordEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductionOrderEntity)
    private readonly poRepo: Repository<ProductionOrderEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly woRepo: Repository<WorkOrderEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepo: Repository<MaterialEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
  ) {}

  async create(dto: CreateTraceabilityDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    const productionOrder = await this.poRepo.findOneBy({
      id: dto.productionOrderId,
    });
    if (!product || !productionOrder)
      throw new NotFoundException('Product or production order not found');

    const workOrder = dto.workOrderId
      ? ((await this.woRepo.findOneBy({ id: dto.workOrderId })) ?? undefined)
      : undefined;

    const material = dto.materialId
      ? ((await this.materialRepo.findOneBy({ id: dto.materialId })) ??
        undefined)
      : undefined;

    const machine = dto.machineId
      ? ((await this.machineRepo.findOneBy({ id: dto.machineId })) ?? undefined)
      : undefined;

    const traceabilityRecord = this.repo.create({
      serialNumber: dto.serialNumber,
      materialBatch: dto.materialBatch,
      product,
      productionOrder,
      workOrder,
      material,
      machine,
    });

    return await this.repo.save(traceabilityRecord);
  }

  async findAll() {
    return await this.repo.find({
      relations: {
        product: true,
        productionOrder: true,
        workOrder: true,
        material: true,
        machine: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findBySerial(serialNumber: string) {
    const row = await this.repo.findOne({
      where: { serialNumber },
      relations: {
        product: true,
        productionOrder: true,
        workOrder: true,
        material: true,
        machine: true,
      },
    });
    if (!row) throw new NotFoundException('Traceability record not found');
    return row;
  }
}
