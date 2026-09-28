import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTraceabilityDto {
  @IsString()
  serialNumber: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  productionOrderId: string;

  @IsOptional()
  @IsUUID()
  workOrderId?: string;

  @IsOptional()
  @IsUUID()
  materialId?: string;

  @IsOptional()
  @IsUUID()
  machineId?: string;

  @IsOptional()
  @IsString()
  materialBatch?: string;
}
