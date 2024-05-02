import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ProductModule, OrderModule, AuthModule],
  controllers: [],
  providers: [AuthService, PrismaService, UsersService],
})
export class AppModule {}
