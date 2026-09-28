import { IsOptional } from 'class-validator';

export class UpdateWorkCentersDto {
  @IsOptional()
  code: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description?: string;
}
