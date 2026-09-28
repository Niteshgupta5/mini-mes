import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BomService } from './bom.service';
import { CreateBomDto } from './domain';

@Controller('boms')
export class BomController {
  constructor(private readonly service: BomService) {}

  @Post()
  async createBom(@Body() dto: CreateBomDto) {
    return await this.service.create(dto);
  }

  @Get()
  async getBoms() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }
}
