import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TraceabilityService } from './traceability.service';
import { CreateTraceabilityDto } from './domain';

@Controller('traceability')
export class TraceabilityController {
  constructor(private readonly service: TraceabilityService) {}

  @Post()
  async createTraceability(@Body() dto: CreateTraceabilityDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getTraceabilities() {
    return await this.service.findAll();
  }

  @Get(':serialNumber')
  async getTraceabilityBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ) {
    return await this.service.findBySerial(serialNumber);
  }
}
