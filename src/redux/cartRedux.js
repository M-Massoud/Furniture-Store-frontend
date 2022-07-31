import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.totalPrice += action.payload.price;
    },

    removeProduct: (state, action) => {
      state.quantity -= 1;

      // const itemId = action.payload._id;
      // state.products = state.products.filter(item => item._id !== itemId);

      for (let index = 0; index < state.products.length; index++) {
        if (state.products[index]._id === action.payload._id) {
          state.products.splice(index, 1);

          state.totalPrice =
            state.totalPrice - (action.payload.price - action.payload.discount);
          return;
        }
        return;
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
