import { Body, Controller, Get, Post } from '@nestjs/common';
import { QualityService } from './quality.service';
import { CreateQualityDto } from './domain';

@Controller('quality')
export class QualityController {
  constructor(private readonly service: QualityService) {}

  @Post('inspections')
  async create(@Body() dto: CreateQualityDto) {
    return await this.service.create(dto);
  }

  @Get('inspections')
  async getAllInspections() {
    return await this.service.findAll();
  }
}
