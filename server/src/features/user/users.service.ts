import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../entities';
import { CreateUserDto } from './domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return await this.repo.save(
      this.repo.create({
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: dto.role,
      }),
    );
  }

  async findAll() {
    return await this.repo.find({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: string) {
    const row = await this.repo.findOneBy({ id });
    if (!row) throw new NotFoundException('User not found');
    return row;
  }
}
