import { IsBoolean } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsBoolean()
  seller?: boolean;
}
