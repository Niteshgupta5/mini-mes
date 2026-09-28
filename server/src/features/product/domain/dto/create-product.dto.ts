import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductUnit } from '../enums/product-unit.js';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProductUnit)
  unit?: ProductUnit;
}
