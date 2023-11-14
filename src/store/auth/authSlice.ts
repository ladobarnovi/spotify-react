import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTokenFromUrl } from "utils/auth";
import { IUser } from "types/user";

const token = getTokenFromUrl();

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
      console.log("Set [isAuthorized]", action.payload);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      console.log("Set [user]", action.payload);
    },
  }
});

export const { setIsAuthorized, setUser } = authSlice.actions
export default authSlice.reducer;
