import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { role as Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "The user's email address",
    example: 'email@mail.com',
    type: String,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: "The user's password",
    example: 'password',
    type: String,
  })
  password: string;

  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The user's first name",
    example: 'John',
    type: String,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: "The user's last name",
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @ApiPropertyOptional({
    description: "The user's roles",
    example: {
      role: ['ADMIN', 'USER'],
    },
    type: [String],
  })
  @IsNotEmpty()
  roles?: Role[];
}
