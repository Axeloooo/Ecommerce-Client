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

export interface TicketInterface {
  _id: string;
  code: string;
  purchase_datetime: string;
  purchaser: string;
  amount: number;
}

export interface ProductInterface {
  _id: string;
  title: string;
  price: number;
  description: string;
  code: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}

export interface ProductsInterface {
  docs: ProductInterface[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface AuthContextInterface {
  isAuthenticated: boolean;
  login: (string) => void;
  logout: () => void;
  register: (string) => void;
}

export interface CartInterface {
  _id: string;
  products: CartItem[];
}

export interface CartItemInterface {
  quantity: number;
  product: ProductInterface;
  _id: string;
}
