export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  createdAt: Date;
  updatedAt: Date;
}
export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  //product   product?
  //order     order?
}
