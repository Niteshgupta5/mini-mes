import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineEntity, WorkCenterEntity } from '../../entities';
import { CreateMachinesDto, UpdateMachinesDto } from './domain';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(MachineEntity)
    private readonly repo: Repository<MachineEntity>,
    @InjectRepository(WorkCenterEntity)
    private readonly wcRepo: Repository<WorkCenterEntity>,
  ) {}

  async create(dto: CreateMachinesDto) {
    const { workCenter, ...data } = dto as any;
    const wc = workCenter?.id
      ? await this.wcRepo.findOneBy({ id: workCenter.id })
      : undefined;
    return await this.repo.save(this.repo.create({ ...data, workCenter: wc }));
  }

  async findAll() {
    return await this.repo.find({
      relations: { workCenter: true },
      order: { code: 'ASC' },
    });
  }

  async findOne(id: string) {
    const row = await this.repo.findOne({
      where: { id },
      relations: { workCenter: true },
    });
    if (!row) throw new NotFoundException('Machine not found');
    return row;
  }

  async update(id: string, dto: UpdateMachinesDto) {
    const row = await this.findOne(id);
    Object.assign(row, dto as any);
    return await this.repo.save(row);
  }

  async remove(id: string) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Deleted successfully' };
  }
}
