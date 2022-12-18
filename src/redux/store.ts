import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./reducer/navbarReducer";
import notificationReducer from "./reducer/notificationReducer";
import roomReducer from "./reducer/roomReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  navbar: navbarReducer,
  room: roomReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
