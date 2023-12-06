import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/types";

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      login: (state) => {
        state.isLoggedIn = true;
      },
      logout: (state) => {
        state.isLoggedIn = false;
      }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;