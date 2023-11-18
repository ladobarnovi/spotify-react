import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./auth/authSlice"
import globalReducer, { GlobalState } from "store/global/globalSlice";
import userReducer, { UserState } from "store/user/userSlice";

export interface RootState {
  authReducer: AuthState;
  globalReducer: GlobalState;
  userReducer: UserState;
}

export default configureStore<RootState>({
  reducer: {
    authReducer,
    globalReducer,
    userReducer,
  },
})

