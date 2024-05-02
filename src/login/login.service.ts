import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { comparePassword } from 'src/auth/password.helper';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await comparePassword(password, user.password)) {
      return JSON.stringify({ message: 'Welcome', user });
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  register(registerDto: RegisterDto) {
    return JSON.stringify(registerDto);
  }
}
