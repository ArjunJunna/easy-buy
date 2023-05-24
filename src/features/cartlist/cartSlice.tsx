import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export type ProductData = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type InitialState = {
  cartData: ProductData[];
};

const initialState: InitialState = {
  cartData: [],
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<ProductData>) => {
      if (action.payload) {
        toast.success('Your product has been added to cartlist.', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
      state.cartData = [...state.cartData, action.payload];
      console.log('add to cart dispatched: ', state.cartData);
    },
    RemoveFromCart: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        toast.success('Your product is removed from cartlist.', {
          style: { background: '#c57622', color: '#FFFFFF' },
        });
      }
      state.cartData = state.cartData.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const cartReducer = productSlice.reducer;

export const { AddToCart, RemoveFromCart } =
  productSlice.actions;
