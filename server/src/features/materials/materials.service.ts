import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from '../../entities';
import { CreateMaterialsDto, UpdateMaterialsDto } from './domain';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly repo: Repository<MaterialEntity>,
  ) {}

  async create(dto: CreateMaterialsDto) {
    return await this.repo.save(this.repo.create(dto as any));
  }

  async findAll() {
    return await this.repo.find({
      relations: {} as any,
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findById(id: string) {
    const row = await this.repo.findOneBy({ id } as any);
    if (!row) throw new NotFoundException('Material not found');
    return row;
  }

  async update(id: string, dto: UpdateMaterialsDto) {
    const row = await this.findById(id);
    Object.assign(row, dto);
    return await this.repo.save(row);
  }

  async remove(id: string) {
    const row = await this.findById(id);
    await this.repo.remove(row);
    return { message: 'Deleted successfully' };
  }
}
