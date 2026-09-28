import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './domain';

@Controller('production-orders')
export class ProductionOrdersController {
  constructor(private readonly service: ProductionOrdersService) {}

  @Post()
  async createProductionOrder(@Body() dto: CreateProductionOrderDto) {
    return await this.service.create(dto);
  }

  @Get()
  async fetchProductionOrders() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getProductionOrderById(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post(':id/release')
  async release(@Param('id') id: string) {
    return await this.service.release(id);
  }
}
