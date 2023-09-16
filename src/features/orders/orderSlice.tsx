import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addOrder, getAllUserOrders } from '../../services/orderService';
import { ProductDataForCart } from '../../../Types';

type DeliveryAddress = {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: number;
  zipcode: number;
};

type OrderData = {
  userId: string;
  products: ProductDataForCart[];
  amount: number;
  deliveryAddress: DeliveryAddress;
  paymentId: string;
  orderId: string;
};

type InitialState = {
  orderData: OrderData;
  prevOrderData: OrderData[];
  loader: boolean;
};

const initialState: InitialState = {
  orderData: {
    userId: '',
    products: [],
    amount: 0,
    deliveryAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: 0,
      phoneNumber: 0,
    },
    paymentId: '',
    orderId: '',
  },
  loader: false,
  prevOrderData: [],
};

export const createUserOrder = createAsyncThunk(
  'orders/addUserOrder',
  async (arg: any, { rejectWithValue }) => {
    try {
   
      const response = await addOrder(arg); 
    
      const data = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserOrder = createAsyncThunk(
  'orders/getUserOrder',
  async (arg: string, { rejectWithValue }) => {
    try {
      const response = await getAllUserOrders(arg);
      const data = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUserOrder.pending, state => {
      state.loader = true;
    });
    builder.addCase(createUserOrder.fulfilled, (state, action) => {
      state.loader = false;
      state.orderData = action.payload;
      state.prevOrderData = [...state.prevOrderData, action.payload];
    });
    builder.addCase(fetchUserOrder.pending, state => {
      state.loader = true;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
      state.loader = false;
      state.orderData = action.payload;
    });
  },
});

export const orderReducer = ordersSlice.reducer;
