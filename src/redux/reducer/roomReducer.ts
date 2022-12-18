import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliceState {
  roomId: string | null;
}

const initialState: SliceState = {
  roomId: null,
};

const roomBattleSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state: SliceState, action: PayloadAction<SliceState>) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { setRoomId } = roomBattleSlice.actions;
export default roomBattleSlice.reducer;
