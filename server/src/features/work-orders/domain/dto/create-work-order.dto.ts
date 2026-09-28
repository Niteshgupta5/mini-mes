import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateWorkOrderDto {
  @IsUUID()
  productionOrderId: string;

  @IsInt()
  @Min(1)
  plannedQuantity: number;

  @IsOptional()
  @IsUUID()
  operationId?: string;

  @IsOptional()
  @IsUUID()
  machineId?: string;
}
