import { IsOptional } from 'class-validator';

export class UpdateMaterialsDto {
  @IsOptional()
  code: string;
  @IsOptional()
  name: string;
  @IsOptional()
  unit?: string;
  @IsOptional()
  stock?: number;
}
