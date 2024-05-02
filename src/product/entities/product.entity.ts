import { User } from 'src/users/entities/user.entity';

export class Product {
  name: string;
  description: string;
  price: number;
  seller: User;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}
