import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DowntimeEventEntity,
  MachineEntity,
  MaterialEntity,
  ProductEntity,
  ProductionOrderEntity,
  QualityInspectionEntity,
  WorkOrderEntity,
} from '../../entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly products: Repository<ProductEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materials: Repository<MaterialEntity>,
    @InjectRepository(MachineEntity)
    private readonly machines: Repository<MachineEntity>,
    @InjectRepository(ProductionOrderEntity)
    private readonly orders: Repository<ProductionOrderEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly workOrders: Repository<WorkOrderEntity>,
    @InjectRepository(DowntimeEventEntity)
    private readonly downtime: Repository<DowntimeEventEntity>,
    @InjectRepository(QualityInspectionEntity)
    private readonly quality: Repository<QualityInspectionEntity>,
  ) {}

  async summary() {
    const [
      products,
      materials,
      machines,
      productionOrders,
      workOrders,
      downtimeEvents,
      inspections,
    ] = await Promise.all([
      this.products.count(),
      this.materials.count(),
      this.machines.count(),
      this.orders.count(),
      this.workOrders.count(),
      this.downtime.count(),
      this.quality.count(),
    ]);

    const machineStatus = await this.machines
      .createQueryBuilder('m')
      .select('m.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('m.status')
      .getRawMany();

    const production = await this.orders
      .createQueryBuilder('o')
      .select('COALESCE(SUM(o.goodQuantity),0)', 'good')
      .addSelect('COALESCE(SUM(o.scrapQuantity),0)', 'scrap')
      .addSelect('COALESCE(SUM(o.producedQuantity),0)', 'produced')
      .addSelect('COALESCE(SUM(o.plannedQuantity),0)', 'planned')
      .getRawOne();

    return {
      counts: {
        products,
        materials,
        machines,
        productionOrders,
        workOrders,
        downtimeEvents,
        inspections,
      },
      machineStatus,
      production: {
        planned: Number(production?.plannedQuantity ?? 0),
        produced: Number(production?.produced ?? 0),
        good: Number(production?.good ?? 0),
        scrap: Number(production?.scrap ?? 0),
      },
    };
  }
}
