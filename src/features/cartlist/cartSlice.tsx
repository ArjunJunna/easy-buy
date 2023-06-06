import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { ProductDataForCart } from '../../../Types';

type InitialState = {
  cartData: ProductDataForCart[];
};

const initialState: InitialState = {
  cartData: [],
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<ProductDataForCart>) => {
      if (action.payload) {
        toast.success('Your product has been added to cartlist.', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
      state.cartData = [...state.cartData, action.payload];
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
    ClearCartlist: state => {
      state.cartData = [];
    },
    UpdateQuantity: (state, action: PayloadAction<ProductDataForCart[]>) => {
      if (action.payload) {
        toast.success('Your item has been updated', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
      state.cartData = action.payload;
    },
  },
});

export const cartReducer = productSlice.reducer;

export const { AddToCart, RemoveFromCart, UpdateQuantity, ClearCartlist } =
  productSlice.actions;
