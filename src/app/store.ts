import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { queryApi } from "~/services/queryApi";

import counterReducer from "../features/counter/counterSlice";
import mainAppDrawerReducer from "../features/navigation/mainAppDrawerSlice";
import showsReducer from "../features/show/endpoints/getShows";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mainAppDrawer: mainAppDrawerReducer,
    shows: showsReducer,
    [queryApi.reducerPath]: queryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(queryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
