import { Injectable } from '@nestjs/common';
import { UserSeed } from './user.seed';

@Injectable()
export class SeedingService {
  constructor(
    private readonly userSeed: UserSeed,
  ) {}

  async run(): Promise<void> {
    console.log('Starting database seed...');

    await this.userSeed.run();

    console.log('Database seed completed.');
  }
}