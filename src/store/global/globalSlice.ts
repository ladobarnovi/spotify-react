import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IColor {
  r: number;
  g: number;
  b: number;
}

export enum ELayout {
  Main,
  Login
}

export interface GlobalState {
  isPopupActive: boolean;
  isSidebarCompact: boolean;
  isNowPlayingActive: boolean;
  scrollDistance: number;
  headerColor: IColor|null;
  globalLayout: ELayout;
}

const initialState: GlobalState = {
  isPopupActive: false,
  isSidebarCompact: false,
  isNowPlayingActive: false,
  scrollDistance: 0,
  headerColor: null,
  globalLayout: ELayout.Main,
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
    },

    setGlobalLayout: (state, action: PayloadAction<ELayout>) => {
      state.globalLayout = action.payload;
    },

    setIsNowPlayingActive: (state, action: PayloadAction<boolean>) => {
      state.isNowPlayingActive = action.payload;
    }
  }
})

export default globalSlice.reducer;
export const {
  setIsPopupActive,
  setIsSidebarCompact,
  setScrollDistance,
  setHeaderColor,
  setGlobalLayout,
  setIsNowPlayingActive,
} = globalSlice.actions;
