import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { UserEntity } from '../users.entity';
import { UserRole } from '../../features/user';

@Injectable()
export class UserSeed {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async run(): Promise<void> {
    const email = 'admin@mes.local';

    const existingAdmin = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    const passwordHash = await bcrypt.hash('Admin@123', 10);

    const admin = this.userRepository.create({
      email,
      name: 'MES Admin',
      passwordHash,
      role: UserRole.ADMIN,
    });

    await this.userRepository.save(admin);

    console.log(`Admin created: ${email}`);
  }
}
