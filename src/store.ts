import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './features/products/productsSlice';
import { filterReducer } from './features/filters/filterSlice';
import { cartReducer } from './features/cartlist/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    cart:cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
