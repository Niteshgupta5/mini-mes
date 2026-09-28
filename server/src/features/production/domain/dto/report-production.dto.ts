import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class ReportProductionDto {
  @IsUUID()
  workOrderId: string;

  @IsInt()
  @Min(0)
  goodQuantity: number;

  @IsInt()
  @Min(0)
  scrapQuantity: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsUUID()
  machineId?: string;
}
