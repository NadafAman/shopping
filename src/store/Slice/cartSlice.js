import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (ele) => ele.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (ele) => ele.id === action.payload
      );
      if (itemIndex !== -1) {
        const tempObj = state.items[itemIndex];
        if (tempObj.quantity > 1) {
          tempObj.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        state.totalItems -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
