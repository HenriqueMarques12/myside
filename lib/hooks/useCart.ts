'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  toggleCart, 
  initializeCart,
  clearCart,
  applyCoupon,
  removeCoupon
} from '@/lib/store/features/cartSlice';
import { Product } from '@/lib/types/Product';
import { CouponDiscount } from '@/lib/types/Cart';
import { useEffect } from 'react';

const AVAILABLE_COUPONS: CouponDiscount[] = [
  { code: 'PROMO20', discount: 0.20 }, // 20% de desconto
];

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const addItem = (product: Product) => {
    dispatch(addToCart(product));
  };

  const removeItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const toggleCartDrawer = () => {
    dispatch(toggleCart());
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const validateCoupon = (code: string): CouponDiscount | null => {
    return AVAILABLE_COUPONS.find(coupon => coupon.code === code) || null;
  };

  const applyCouponCode = (code: string) => {
    const coupon = validateCoupon(code);
    if (coupon) {
      dispatch(applyCoupon(code));
      return true;
    }
    return false;
  };

  const removeCouponCode = () => {
    dispatch(removeCoupon());
  };

  const getDiscount = () => {
    if (!cart.couponCode) return 0;
    const coupon = validateCoupon(cart.couponCode);
    if (!coupon) return 0;
    
    const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal * coupon.discount;
  };

  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = getDiscount();
  const totalPrice = subtotal - discount;

  return {
    items: cart.items,
    isOpen: cart.isOpen,
    couponCode: cart.couponCode,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    addItem,
    removeItem,
    updateItemQuantity,
    toggleCartDrawer,
    clearCartItems,
    applyCouponCode,
    removeCouponCode,
  };
};