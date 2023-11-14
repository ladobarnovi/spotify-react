import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./auth/authSlice"
import globalReducer, { GlobalState } from "store/global/globalSlice";

export interface RootState {
  authReducer: AuthState;
  globalReducer: GlobalState;
}

export default configureStore<RootState>({
  reducer: {
    authReducer,
    globalReducer,
  },
})

