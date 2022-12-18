import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliceState {
  isHidden: boolean;
}

const initialState: SliceState = {
  isHidden: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbarAct: (state: SliceState, action: PayloadAction<SliceState>) => {
      state.isHidden = action.payload.isHidden;
    }
  }
})

export const { setNavbarAct } = navbarSlice.actions;
export default navbarSlice.reducer;
