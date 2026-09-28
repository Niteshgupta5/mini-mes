import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MachineEntity,
  ProductionEventEntity,
  ProductionOrderEntity,
  WorkOrderEntity,
} from '../../entities';
import { ReportProductionDto } from './domain';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(ProductionEventEntity)
    private readonly eventRepo: Repository<ProductionEventEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly woRepo: Repository<WorkOrderEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
    @InjectRepository(ProductionOrderEntity)
    private readonly poRepo: Repository<ProductionOrderEntity>,
  ) {}

  async report(dto: ReportProductionDto, userId?: string) {
    const wo = await this.woRepo.findOne({
      where: { id: dto.workOrderId },
      relations: { productionOrder: true },
    });
    if (!wo) throw new NotFoundException('Work order not found');

    const machine = dto.machineId
      ? ((await this.machineRepo.findOneBy({ id: dto.machineId })) ?? undefined)
      : undefined;

    wo.goodQuantity += dto.goodQuantity;
    wo.scrapQuantity += dto.scrapQuantity;
    await this.woRepo.save(wo);

    const po = await this.poRepo.findOneBy({ id: wo.productionOrder.id });
    if (po) {
      po.producedQuantity += dto.goodQuantity + dto.scrapQuantity;
      po.goodQuantity += dto.goodQuantity;
      po.scrapQuantity += dto.scrapQuantity;
      await this.poRepo.save(po);
    }

    return await this.eventRepo.save(
      this.eventRepo.create({
        eventType: 'PRODUCTION_REPORTED',
        quantity: dto.goodQuantity + dto.scrapQuantity,
        reason: dto.reason,
        workOrder: wo,
        machine,
      }),
    );
  }

  async findEvents(workOrderId?: string) {
    return await this.eventRepo.find({
      where: workOrderId ? { workOrder: { id: workOrderId } } : {},
      relations: { workOrder: true, machine: true },
      order: { createdAt: 'DESC' },
    });
  }
}
