import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  arrFollowedEntityIds: string[];
}

const initialState: UserState = {
  arrFollowedEntityIds: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFollowedEntityIds: (state, action: PayloadAction<string[]>) => {
      state.arrFollowedEntityIds = action.payload;
    },

    addFollowedEntityId: (state, action: PayloadAction<string>) => {
      state.arrFollowedEntityIds = [ ...state.arrFollowedEntityIds, action.payload ];
    },

    removeFollowedEntityId: (state, action: PayloadAction<string>) => {
      state.arrFollowedEntityIds = state.arrFollowedEntityIds.filter((id) => (id !== action.payload));
    },
  }
});

export const { setFollowedEntityIds, addFollowedEntityId, removeFollowedEntityId } = userSlice.actions;
export default userSlice.reducer
