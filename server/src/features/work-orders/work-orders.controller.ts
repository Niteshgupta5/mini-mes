import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { CreateWorkOrderDto } from './domain';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly service: WorkOrdersService) {}

  @Post()
  async createWorkOrder(@Body() dto: CreateWorkOrderDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getWorkOrders() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getWorkOrderById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post(':id/start')
  async startWorkOrder(@Param('id') id: string) {
    return await this.service.start(id);
  }

  @Post(':id/complete')
  async completeWorkOrder(@Param('id') id: string) {
    return await this.service.complete(id);
  }
}
