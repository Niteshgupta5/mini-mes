import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('production')
  async production() {
    return await this.service.production();
  }

  @Get('downtime')
  async downtime() {
    return await this.service.downtimeReport();
  }
}
