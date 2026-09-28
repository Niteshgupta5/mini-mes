import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ReportProductionDto } from './domain';

@Controller('production')
export class ProductionController {
  constructor(private readonly service: ProductionService) {}

  @Post('report')
  async report(@Body() dto: ReportProductionDto) {
    return await this.service.report(dto);
  }

  @Get('events')
  async events(@Query('workOrderId') workOrderId?: string) {
    return await this.service.findEvents(workOrderId);
  }
}
