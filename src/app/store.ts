import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { queryApi } from "~/services/queryApi";

import loginTokenSlice from "../features/auth/loginSlice";
import counterReducer from "../features/counter/counterSlice";
import mainAppDrawerReducer from "../features/navigation/mainAppDrawerSlice";
import showsReducer from "../features/show/endpoints/getShows";

const persistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["counter", "mainAppDrawer", "loginTokens", "shows", "strapi"], // which reducer want to store
  // whitelist: ['user', 'sidebar', 'debug', 'event', 'strapi', 'queryApi'], // which reducer want to store
};

const rootReducer = combineReducers({
  counter: counterReducer,
  mainAppDrawer: mainAppDrawerReducer,
  loginTokens: loginTokenSlice,
  shows: showsReducer,
  [queryApi.reducerPath]: queryApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(queryApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
