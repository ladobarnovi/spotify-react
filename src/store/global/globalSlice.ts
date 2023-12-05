import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IColor {
  r: number;
  g: number;
  b: number;
}

export interface GlobalState {
  isPopupActive: boolean;
  isSidebarCompact: boolean;
  scrollDistance: number;
  headerColor: IColor|null;
}

const initialState: GlobalState = {
  isPopupActive: false,
  isSidebarCompact: false,
  scrollDistance: 0,
  headerColor: null,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsPopupActive: (state, action: PayloadAction<boolean>) => {
      state.isPopupActive = action.payload;
    },

    setIsSidebarCompact: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCompact = action.payload;
    },

    setScrollDistance: (state, action: PayloadAction<number>) => {
      state.scrollDistance = action.payload;
    },

    setHeaderColor: (state, action: PayloadAction<IColor|null>) => {
      state.headerColor = action.payload;
    }
  }
})

export default globalSlice.reducer;
export const {
  setIsPopupActive,
  setIsSidebarCompact,
  setScrollDistance,
  setHeaderColor
} = globalSlice.actions;
