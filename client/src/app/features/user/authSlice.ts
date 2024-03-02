import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return {
      user: JSON.parse(user),
      isAuth: true,
    };
  }
  return {
    user: {},
    isAuth: false,
  };
}

const initialState: { user: object; isAuth: boolean } = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      localStorage.setItem("user", JSON.stringify(payload));
      state.user = payload;
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = {};
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
