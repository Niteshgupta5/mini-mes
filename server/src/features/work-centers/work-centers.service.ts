import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkCenterEntity } from '../../entities';
import { CreateWorkCentersDto, UpdateWorkCentersDto } from './domain';

@Injectable()
export class WorkCentersService {
  constructor(
    @InjectRepository(WorkCenterEntity)
    private readonly repo: Repository<WorkCenterEntity>,
  ) {}

  async create(dto: CreateWorkCentersDto) {
    return await this.repo.save(this.repo.create(dto as any));
  }

  async findAll() {
    return await this.repo.find({
      relations: {} as any,
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findOne(id: string) {
    const row = await this.repo.findOneBy({ id } as any);
    if (!row) throw new NotFoundException('WorkCenter not found');
    return row;
  }

  async update(id: string, dto: UpdateWorkCentersDto) {
    const row = await this.findOne(id);
    Object.assign(row, dto);
    return await this.repo.save(row);
  }

  async deleteById(id: string) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Deleted successfully' };
  }
}
