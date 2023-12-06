import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AUTH_TOKEN_KEY } from "utils/auth";
import { IUser } from "types/user";

const token = localStorage.getItem(AUTH_TOKEN_KEY) || "";

export interface AuthState {
  isAuthorized: boolean;
  token: string;
  user: IUser|null;
}

const initialState: AuthState = {
  isAuthorized: !!token,
  token: token,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  }
});

export const { setIsAuthorized, setUser } = authSlice.actions
export default authSlice.reducer;
