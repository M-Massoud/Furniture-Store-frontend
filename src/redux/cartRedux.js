import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : { role: 'visitor' };
let userInitialSatate = token.role === 'user' ? JSON.parse(localStorage.getItem(`cartForUid-${token.id}`)) : null;

const cartSlice = createSlice({
  name: 'cart',
  initialState: userInitialSatate || {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.totalPrice += action.payload.price;
      token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
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
          token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
          return;
        }
      }
    },

    refreshCart: (state, action) => {
      state.products = userInitialSatate.products;
      state.quantity = userInitialSatate.quantity;
      state.totalPrice = userInitialSatate.totalPrice;
    },

    clearCartState: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },

    emptyCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
      token?.role === 'user' ? localStorage.removeItem(`cartForUid-${token.id}`) : console.log('not user');
    }
  },
});

export const { addProduct, removeProduct, emptyCart ,clearCartState ,refreshCart} = cartSlice.actions;

export default cartSlice.reducer;
