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
      // check if the product is already in the cart
      let dublicateIndicator = state.products.some(function (product) {
        return product.product._id === action.payload.product._id;
      });
      if (dublicateIndicator) {
        // get the index of the dublicated object
        let dublicatedProductIndex = state.products.findIndex((product) => product.product._id === action.payload.product._id);
        // ensure that the overall quantity ordered don't exceed the available stock amount
        state.products[dublicatedProductIndex].quantity + action.payload.quantity <= action.payload.maxQuantity ?
          state.products[dublicatedProductIndex].quantity += action.payload.quantity :
          state.products[dublicatedProductIndex].quantity = action.payload.maxQuantity;
        // recalculating the order new total price
        state.totalPrice += (action.payload.price * action.payload.quantity);
        token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
      }
      else {
        state.quantity += 1;
        state.products.push({ product: action.payload.product, quantity: action.payload.quantity });
        state.totalPrice += (action.payload.price * action.payload.quantity);
        token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
      }
    },

    removeProduct: (state, action) => {
      // const itemId = action.payload._id;
      // state.products = state.products.filter(item => item._id !== itemId);

      for (let index = 0; index < state.products.length; index++) {
        if (state.products[index].product._id === action.payload.product._id) {
          state.quantity -= 1;

          state.products.splice(index, 1);
          state.totalPrice -= ((action.payload.product.price - action.payload.product.discount) * action.payload.quantity);
          // state.totalPrice =
          //   state.totalPrice - ((action.payload.price - action.payload.discount) * action.payload.quantity);
          token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
          return;
        }
      }
    },

    refreshCart: (state, action) => {
      let token = localStorage.getItem('token') ? jwt(localStorage.getItem('token')) : { role: 'visitor' };
      let userInitialSatate = token.role === 'user' ? JSON.parse(localStorage.getItem(`cartForUid-${token.id}`)) : null;
      state.products = userInitialSatate !== null ? [...userInitialSatate.products, ...state.products] : state.products;
      state.quantity = userInitialSatate !== null ? userInitialSatate.quantity + state.quantity : state.quantity;
      state.totalPrice = userInitialSatate !== null ? userInitialSatate.totalPrice + state.totalPrice : state.totalPrice;
      token?.role === 'user' ? localStorage.setItem(`cartForUid-${token.id}`, JSON.stringify(state)) : console.log('not user');
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

export const { addProduct, removeProduct, emptyCart, clearCartState, refreshCart } = cartSlice.actions;

export default cartSlice.reducer;
