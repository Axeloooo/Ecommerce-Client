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

export interface PaymentIntentInterface {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: AmountDetailsInterface;
  amount_received: number;
  application: any;
  application_fee_amount: any;
  automatic_payment_methods: any;
  canceled_at: any;
  cancellation_reason: any;
  capture_method: string;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: any;
  description: any;
  invoice: any;
  last_payment_error: any;
  latest_charge: any;
  livemode: boolean;
  metadata: MetadataInterface;
  next_action: any;
  on_behalf_of: any;
  payment_method: any;
  payment_method_options: PaymentMethodOptionsInterface;
  payment_method_types: string[];
  processing: any;
  receipt_email: any;
  review: any;
  setup_future_usage: any;
  shipping: any;
  source: any;
  statement_descriptor: any;
  statement_descriptor_suffix: any;
  status: string;
  transfer_data: any;
  transfer_group: any;
}

export interface AmountDetailsInterface {
  tip: TipInterface;
}

export interface TipInterface {}

export interface MetadataInterface {}

export interface PaymentMethodOptionsInterface {
  card: CardInterface;
}

export interface CardInterface {
  installments: any;
  mandate_options: any;
  network: any;
  request_three_d_secure: string;
}
