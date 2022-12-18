import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliceState {
  isNotification: boolean;
  isSuccess: null | boolean;
  message: string | null;
}

const initialState: SliceState = {
  isNotification: false,
  isSuccess: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state: SliceState, action: PayloadAction<SliceState>) => {
      state.isNotification = action.payload.isNotification;
      state.isSuccess = action.payload.isSuccess;
      state.message = action.payload.message;
    },
    resetNotification: (state: SliceState) => {
      state.isNotification = false;
      state.isSuccess = null;
      state.message = null;
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
