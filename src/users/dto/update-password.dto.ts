import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  new_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  old_password: string;
}
