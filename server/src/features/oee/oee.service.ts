import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DowntimeEventEntity,
  MachineEntity,
  ProductionEventEntity,
  WorkOrderEntity,
} from '../../entities';

@Injectable()
export class OeeService {
  constructor(
    @InjectRepository(DowntimeEventEntity)
    private readonly downtimeRepo: Repository<DowntimeEventEntity>,
    @InjectRepository(ProductionEventEntity)
    private readonly productionRepo: Repository<ProductionEventEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly workOrderRepo: Repository<WorkOrderEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
  ) {}

  async calculate(
    machineId: string,
    plannedMinutes = 480,
    idealCycleSeconds = 30,
  ) {
    const machine = await this.machineRepo.findOneBy({ id: machineId });
    if (!machine) return null;

    const downtime = await this.downtimeRepo
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.durationSeconds), 0)', 'seconds')
      .where('d.machineId = :machineId', { machineId })
      .getRawOne();

    const total = await this.productionRepo
      .createQueryBuilder('p')
      .select('COALESCE(SUM(p.quantity), 0)', 'count')
      .where('p.machineId = :machineId', { machineId })
      .getRawOne();

    const totalCount = Number(total?.count ?? 0);
    const downtimeSeconds = Number(downtime?.seconds ?? 0);
    const plannedSeconds = plannedMinutes * 60;
    const runSeconds = Math.max(0, plannedSeconds - downtimeSeconds);

    const availability = plannedSeconds ? runSeconds / plannedSeconds : 0;
    const performance =
      runSeconds && idealCycleSeconds
        ? (idealCycleSeconds * totalCount) / runSeconds
        : 0;

    const workOrders = await this.workOrderRepo.find({
      where: { machine: { id: machineId } },
    });
    const good = workOrders.reduce((sum, x) => sum + x.goodQuantity, 0);
    const quality = totalCount ? good / totalCount : 0;
    const oee = availability * performance * quality;

    return {
      machine: { id: machine.id, code: machine.code, name: machine.name },
      availability: Number((availability * 100).toFixed(2)),
      performance: Number((performance * 100).toFixed(2)),
      quality: Number((quality * 100).toFixed(2)),
      oee: Number((oee * 100).toFixed(2)),
      plannedSeconds,
      runSeconds,
      downtimeSeconds,
      totalCount,
      goodCount: good,
    };
  }
}
