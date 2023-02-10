import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("access_token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    setCredentials: (state, action) => {
        console.log("function called")
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null
      localStorage.clear()
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
