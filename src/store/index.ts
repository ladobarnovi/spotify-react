import { configureStore } from "@reduxjs/toolkit";
import globalReducer, { GlobalState } from "store/global/globalSlice";
import userReducer, { UserState } from "store/user/userSlice";
import playerReducer, { PlayerState } from "store/player";

export interface RootState {
  globalReducer: GlobalState;
  userReducer: UserState;
  playerReducer: PlayerState;
}

export default configureStore<RootState>({
  reducer: {
    globalReducer,
    userReducer,
    playerReducer,
  },
})

