import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from '@/lib/types/Cart';
import { Product } from '@/lib/types/Product';

const loadCartState = (): CartState => {
  if (typeof window === 'undefined') return { items: [], isOpen: false, couponCode: null };
  
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
  }
  
  return { items: [], isOpen: false, couponCode: null };
};

const saveCartState = (state: CartState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const serializedCart = JSON.stringify({ ...state, isOpen: false });
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const initialState: CartState = loadCartState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart: (state) => {
      const savedState = loadCartState();
      state.items = savedState.items;
      state.couponCode = savedState.couponCode;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      saveCartState(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartState(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      saveCartState(state);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
      saveCartState(state);
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
      saveCartState(state);
    },
    removeCoupon: (state) => {
      state.couponCode = null;
      saveCartState(state);
    },
  },
});

export const { 
  initializeCart, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  toggleCart,
  clearCart,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;

export default cartSlice.reducer;