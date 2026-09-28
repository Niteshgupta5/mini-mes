import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedingService } from './seeding.service';
import { UserSeed } from './user.seed';
import { UserEntity } from '../users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],

  providers: [
    SeedingService,
    UserSeed,
  ],

  exports: [
    SeedingService,
  ],
})
export class SeedsModule {}