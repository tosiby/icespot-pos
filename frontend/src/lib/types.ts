export type Role = 'ADMIN' | 'STAFF';
export type Category = 'Packet' | 'Liter';
export type PaymentMode = 'CASH' | 'UPI';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export type Category =
  | 'REGULAR'
  | 'PREMIUM'
  | 'DELUXE'
  | 'SPECIAL'
  | 'SIGNATURE'
  | 'FAMILY_PACK';

export interface Item {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  lowStockLevel: number;
  isActive: boolean;
}

export interface SaleItemDetail {
  id: number;
  quantity: number;
  price: number;
  item: Item;
}

export interface Sale {
  id: number;
  billNumber: string;
  totalAmount: number;
  paymentMode: PaymentMode;
  createdAt: string;
  staff: { name: string };
  items: SaleItemDetail[];
}
