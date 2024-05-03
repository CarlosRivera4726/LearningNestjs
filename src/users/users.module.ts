import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class UsersModule {}
