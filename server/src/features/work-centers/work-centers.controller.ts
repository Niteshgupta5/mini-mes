import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post } from '@nestjs/common';
import { WorkCentersService } from './work-centers.service';
import { CreateWorkCentersDto, UpdateWorkCentersDto } from './domain';

@Controller('work-centers')
export class WorkCentersController {
  constructor(private readonly service: WorkCentersService) {}

  @Post()
  async createWorkCenter(@Body() dto: CreateWorkCentersDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getAllWorkCenter() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getWorkCenterById(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async updateWorkCenter(
    @Param('id') id: string,
    @Body() dto: UpdateWorkCentersDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async deleteWorkCenter(@Param('id') id: string) {
    return await this.service.deleteById(id);
  }
}
