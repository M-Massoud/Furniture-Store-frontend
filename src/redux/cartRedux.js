import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.totalPrice += action.payload.price;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeProduct: (state, action) => {
      // const itemId = action.payload._id;
      // state.products = state.products.filter(item => item._id !== itemId);

      for (let index = 0; index < state.products.length; index++) {
        if (state.products[index]._id === action.payload._id) {
          state.quantity -= 1;

          state.products.splice(index, 1);

          state.totalPrice =
            state.totalPrice - (action.payload.price - action.payload.discount);
          localStorage.setItem('cart', JSON.stringify(state));
          return;
        }
      }
    },

    emptyCart:(state,action) => {
     state.products = [];
     state.quantity = 0;
     state.totalPrice = 0;
     localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const { addProduct, removeProduct, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
