import { Module } from '@nestjs/common';
import { DowntimeController } from './downtime.controller';
import { DowntimeService } from './downtime.service';

@Module({
  controllers: [DowntimeController],
  providers: [DowntimeService],
})
export class DowntimeModule {}
