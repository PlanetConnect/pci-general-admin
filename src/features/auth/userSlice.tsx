import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface userState {
  user?: DecodedToken;
  loggedIn: boolean;
  savedLoginPath: string;
}

const initialState: userState = {
  user: undefined,
  loggedIn: false,
  savedLoginPath: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setSavedLoginPath: (state, action: PayloadAction<string>) => {
      state.savedLoginPath = action.payload;
    },
    setUser: (state, action: PayloadAction<DecodedToken>) => {
      state.user = action.payload;
    },

    resetUser: () => initialState,
  },
});

export const getLoggedIn = (state: RootState) => state.user.loggedIn;
export const getUser = (state: RootState) => state.user.user;
export const getSavedLoginPath = (state: RootState) =>
  state.user.savedLoginPath;

export const { setLoggedIn, setSavedLoginPath, resetUser, setUser } =
  userSlice.actions;

export default userSlice.reducer;
