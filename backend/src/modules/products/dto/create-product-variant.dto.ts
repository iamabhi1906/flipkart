import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stockQuantity!: number;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;

  @IsOptional()
  images?: string[];

  @IsOptional()
  @IsString()
  thumbnail?: string;
}
