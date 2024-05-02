import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
  imports: [UsersModule],
})
export class LoginModule {}
