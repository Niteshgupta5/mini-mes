import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DowntimeEventEntity,
  MachineEntity,
  WorkOrderEntity,
} from '../../entities';
import { CreateDowntimeDto } from './domain';

@Injectable()
export class DowntimeService {
  constructor(
    @InjectRepository(DowntimeEventEntity)
    private readonly repo: Repository<DowntimeEventEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly woRepo: Repository<WorkOrderEntity>,
  ) {}

  async create(dto: CreateDowntimeDto) {
    const machine = await this.machineRepo.findOneBy({ id: dto.machineId });
    if (!machine) throw new NotFoundException('Machine not found');

    const workOrder = dto.workOrderId
      ? ((await this.woRepo.findOneBy({ id: dto.workOrderId })) ?? undefined)
      : undefined;

    const startedAt = new Date(dto.startedAt);
    const endedAt = dto.endedAt ? new Date(dto.endedAt) : undefined;
    const durationSeconds = endedAt
      ? Math.max(
          0,
          Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000),
        )
      : 0;

    return await this.repo.save(
      this.repo.create({
        ...dto,
        machine,
        workOrder,
        startedAt,
        endedAt,
        durationSeconds,
      }),
    );
  }

  async findAll() {
    return await this.repo.find({
      relations: { machine: true, workOrder: true },
      order: { startedAt: 'DESC' },
    });
  }
}
