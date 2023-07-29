/// <reference types="vite/client" />

export interface RegisteredUserInterface {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}

export type LoggedUserType = Omit<
  registerUser,
  "firstName" | "lastName" | "age"
>;

export interface ProductInterface {
  _id: string;
  title: string;
  price: string;
  description: string;
  code: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}
