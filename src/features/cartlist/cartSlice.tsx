import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { ProductDataForCart,AddToCartType,RemoveFromCartType } from '../../../Types';
import { addToCart,removeProductFromCart } from '../../services/cartService';

type InitialState = {
  cartData: ProductDataForCart[];
  cartLoader:boolean;
};

const initialState: InitialState = {
  cartData: [],
  cartLoader:false,
};

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (arg: AddToCartType, { rejectWithValue }) => {
    try {
      const response = await addToCart(arg);
      const data = response?.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (arg: RemoveFromCartType, { rejectWithValue }) => {
    try {
      const response = await removeProductFromCart(arg);
      const data = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   
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
  extraReducers:builder=>{
    builder.addCase(addProductToCart.pending,state=>{
      state.cartLoader=true;
    });
    builder.addCase(addProductToCart.fulfilled,(state,action)=>{
      state.cartLoader=false;
   
      state.cartData=action.payload;
       if (action.payload) {
         toast.success('Product added to Cart', {
           style: { background: '#22c55e', color: '#FFFFFF' },
         });
       }
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success('Product removed from Cart', {
            style: { background: '#c57622', color: '#FFFFFF' },
          });
        }
      state.cartData = action.payload;
    });
  }
});

export const cartReducer = productSlice.reducer;

export const {  UpdateQuantity, ClearCartlist } =
  productSlice.actions;
