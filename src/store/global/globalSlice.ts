import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  isPopupActive: boolean;
}

const initialState: GlobalState = {
  isPopupActive: false,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsPopupActive: (state, action: PayloadAction<boolean>) => {
      state.isPopupActive = action.payload;
      console.log("Set [isPopupActive]", action.payload);
    }
  }
})

export default globalSlice.reducer;
export const { setIsPopupActive } = globalSlice.actions;
