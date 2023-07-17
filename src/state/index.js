import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  isAuthenticated: true,
  signup: {
    name: "",
    phoneNumber: "",
    email: "",
    workId: "",
    password: "",
    role: "",
  },
  login: {},
  otp: {
    otp: "",
  },
  user: {},
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setIsAuthenticated: (state) => {
      state.isAuthenticated = state.isAuthenticated === false ? true : false;
    },
    setSignup: (state, action) => {
      state.signup = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setLoggedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
    setMode,
    setIsAuthenticated,
    setSignup,
    setLogin,
    setOtp,
    setLoggedUser,
  } = globalSlice.actions;
  
  export default globalSlice.reducer;
