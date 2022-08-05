import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: JSON.parse(localStorage.getItem("loggedIn")) || {
    isLoggedIn: false,
    role:""
  },
  reducers: {
    loggedInSuccessfully: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload;
      localStorage.setItem("loggedIn", JSON.stringify(state));
    },

    loggedOutSuccessfully: (state, action) => {
      state.isLoggedIn = false;
      state.role = "";
      localStorage.setItem("loggedIn", JSON.stringify(state));
    },
  },
});

export const { loggedInSuccessfully, loggedOutSuccessfully } =
  isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
