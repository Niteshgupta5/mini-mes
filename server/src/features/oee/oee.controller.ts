import { Controller, Get, Param, Query } from '@nestjs/common';
import { OeeService } from './oee.service';

@Controller('oee')
export class OeeController {
  constructor(private readonly service: OeeService) {}

  @Get(':machineId')
  async calculate(
    @Param('machineId') machineId: string,
    @Query('plannedMinutes') plannedMinutes?: string,
    @Query('idealCycleSeconds') idealCycleSeconds?: string,
  ) {
    return await this.service.calculate(
      machineId,
      Number(plannedMinutes) || 480,
      Number(idealCycleSeconds) || 30,
    );
  }
}
