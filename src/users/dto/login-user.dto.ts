import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
