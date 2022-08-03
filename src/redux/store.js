import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import isLoggedInReducer from './isLoggedInRedux';

export default configureStore({
  reducer: {
    cart: cartReducer,
    isLoggedIn:isLoggedInReducer,
  },
});
