import { Category } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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
}
