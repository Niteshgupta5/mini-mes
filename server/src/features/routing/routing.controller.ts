import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoutingService } from './routing.service';
import { CreateRoutingDto } from './domain';

@Controller('routings')
export class RoutingController {
  constructor(private readonly service: RoutingService) {}

  @Post()
  async createRoting(@Body() dto: CreateRoutingDto) {
    return await this.service.create(dto);
  }

  @Get()
  async fetchRoutings() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getRoutingById(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
