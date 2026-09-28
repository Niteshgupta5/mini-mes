import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DowntimeEventEntity, ProductionOrderEntity } from '../../entities';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ProductionOrderEntity)
    private readonly orders: Repository<ProductionOrderEntity>,
    @InjectRepository(DowntimeEventEntity)
    private readonly downtime: Repository<DowntimeEventEntity>,
  ) {}

  async production() {
    const rows = await this.orders.find({
      relations: { product: true },
      order: { createdAt: 'DESC' },
    });
    return rows.map((x) => ({
      orderNumber: x.orderNumber,
      product: x.product?.code,
      planned: x.plannedQuantity,
      produced: x.producedQuantity,
      good: x.goodQuantity,
      scrap: x.scrapQuantity,
      yield: x.producedQuantity
        ? Number(((x.goodQuantity / x.producedQuantity) * 100).toFixed(2))
        : 0,
      status: x.status,
    }));
  }

  async downtimeReport() {
    const rows = await this.downtime.find({
      relations: { machine: true },
      order: { startedAt: 'DESC' },
    });
    return rows.map((x) => ({
      machine: x.machine?.code,
      category: x.category,
      reason: x.reason,
      durationSeconds: x.durationSeconds,
      startedAt: x.startedAt,
      endedAt: x.endedAt,
    }));
  }
}
