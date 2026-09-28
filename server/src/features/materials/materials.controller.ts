import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialsDto, UpdateMaterialsDto } from './domain';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly service: MaterialsService) {}

  @Post()
  async createMaterial(@Body() dto: CreateMaterialsDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getAllMaterials() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getMaterialById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Patch(':id')
  async updateMaterial(
    @Param('id') id: string,
    @Body() dto: UpdateMaterialsDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async DeleteMaterial(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
