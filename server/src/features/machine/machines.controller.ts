import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachinesDto, UpdateMachinesDto } from './domain';

@Controller('machines')
export class MachinesController {
  constructor(private readonly service: MachinesService) {}
  @Post()
  async createMachine(@Body() dto: CreateMachinesDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getAllMachines() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findMachineById(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async updateMachine(@Param('id') id: string, @Body() dto: UpdateMachinesDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async DeleteMachine(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
