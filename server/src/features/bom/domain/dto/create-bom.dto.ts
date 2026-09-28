import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BomItemDto {
  @IsUUID()
  materialId: string;
  
  @IsNumber()
  @Min(0)
  quantity: number;
}


export class CreateBomDto {
  @IsUUID()
  productId: string;
  
  @IsString()
  @IsNotEmpty()
  version: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BomItemDto)
  items: BomItemDto[];
}
