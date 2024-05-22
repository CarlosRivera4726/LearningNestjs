import { user as User } from '@prisma/client';
import { Product } from 'src/product/entities/product.entity';

interface ProductOrder {
  product: Product;
  quantity: number;
}

export class Order {
  id: string;
  product: ProductOrder[];
  user: User;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
