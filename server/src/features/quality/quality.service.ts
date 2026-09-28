import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityInspectionEntity, WorkOrderEntity } from '../../entities';
import { CreateQualityDto } from './domain';

@Injectable()
export class QualityService {
  constructor(
    @InjectRepository(QualityInspectionEntity)
    private readonly repo: Repository<QualityInspectionEntity>,
    @InjectRepository(WorkOrderEntity)
    private readonly woRepo: Repository<WorkOrderEntity>,
  ) {}

  async create(dto: CreateQualityDto) {
    const wo = await this.woRepo.findOneBy({ id: dto.workOrderId });
    if (!wo) throw new NotFoundException('Work order not found');
    return await this.repo.save(this.repo.create({ ...dto, workOrder: wo }));
  }

  async findAll() {
    return await this.repo.find({
      relations: { workOrder: true, inspector: true },
      order: { inspectedAt: 'DESC' },
    });
  }
}
