import { combineReducers } from "redux";

// import { queryApi } from "../../Services/queryApi";

export const rootReducer = combineReducers({
  //   [queryApi.reducerPath]: queryApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
