import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductionOrderDto {
  @IsNotEmpty()
  orderNumber: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  plannedQuantity: number;

  @IsOptional()
  @IsDateString()
  plannedStart?: string;

  @IsOptional()
  @IsDateString()
  plannedEnd?: string;
}
