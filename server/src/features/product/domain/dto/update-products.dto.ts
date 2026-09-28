import { IsOptional } from 'class-validator';

export class UpdateProductsDto {
  @IsOptional()
  code: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  unit?: string;
}
