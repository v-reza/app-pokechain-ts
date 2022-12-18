import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  currentUser: any;
}

const initialState: SliceState = {
  currentUser: null,
};

type User = {
  user: any
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: SliceState, action: PayloadAction<User>) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;