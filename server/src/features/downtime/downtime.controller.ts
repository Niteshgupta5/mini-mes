import { Body, Controller, Get, Post } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { CreateDowntimeDto } from './domain';

@Controller('downtime')
export class DowntimeController {
  constructor(private readonly service: DowntimeService) {}

  @Post()
  async create(@Body() dto: CreateDowntimeDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }
}
