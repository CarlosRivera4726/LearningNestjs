import { category as Category } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  sellerId: string;

  @IsString()
  image: string;

  @IsNotEmpty()
  categories: Category[];

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(200)
  quantity: number;
}
