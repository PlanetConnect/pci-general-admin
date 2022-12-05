import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import counterReducer from "../features/counter/counterSlice";
import mainAppDrawerReducer from "../features/navigation/mainAppDrawerSlice";
// import { queryApi } from "../Services/queryApi";
import { rootReducer } from "./store/Reducers";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mainAppDrawer: mainAppDrawerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
