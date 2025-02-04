import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slice/cartSlice';
import productReducer from './Slice/productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});
