import { Product } from './Product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
}

export interface CouponDiscount {
  code: string;
  discount: number;
}