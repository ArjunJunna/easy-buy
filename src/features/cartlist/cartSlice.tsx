import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  ProductDataForCart,
  AddToCartType,
  RemoveFromCartType,
} from '../../../Types';
import {
  addToCart,
  removeProductFromCart,
  getUserCart,
} from '../../services/cartService';

type InitialState = {
  cartData: ProductDataForCart[];
  cartLoader: boolean;
  cartAmount: {
    amount: number;
    discount: number;
    grandTotal: number;
  };
};

const initialState: InitialState = {
  cartData: [],
  cartLoader: false,
  cartAmount: {
    amount: 0,
    discount: 0,
    grandTotal: 0,
  },
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

export const fetchUserCart = createAsyncThunk(
  'cart/getUserCart',
  async (arg: string, { rejectWithValue }) => {
    try {
   
      const response = await getUserCart(arg);
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
      state.cartAmount = {
        amount: 0,
        discount: 0,
        grandTotal: 0,
      };
    },
    UpdateQuantity: (state, action: PayloadAction<ProductDataForCart[]>) => {
      if (action.payload) {
        toast.success('Your item has been updated', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
      state.cartData = action.payload;
    },
    SetTotalAmount: (state, action) => {
      state.cartAmount = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserCart.pending, state => {
      state.cartLoader = true;
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartLoader = false;
      state.cartData = action.payload;
    });
    builder.addCase(addProductToCart.pending, state => {
      state.cartLoader = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cartLoader = false;

      state.cartData = action.payload;
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
  },
});

export const cartReducer = productSlice.reducer;

export const { UpdateQuantity, ClearCartlist,SetTotalAmount } = productSlice.actions;
