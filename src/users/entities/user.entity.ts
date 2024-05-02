interface Address {
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
  seller: boolean;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  //product   product?
  //order     order?
}
