// database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
