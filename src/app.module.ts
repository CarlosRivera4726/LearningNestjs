import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, LoginModule, ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
