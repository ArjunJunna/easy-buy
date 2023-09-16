import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './features/products/productsSlice';
import { filterReducer } from './features/filters/filterSlice';
import { cartReducer } from './features/cartlist/cartSlice';
import { authReducer } from './features/auth/authSlice';
import { profileReducer } from './features/profile/profileSlice';
import { orderReducer } from './features/orders/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,
    orders:orderReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
