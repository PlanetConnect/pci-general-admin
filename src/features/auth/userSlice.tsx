import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";

import { RootState } from "~/app/store";

export interface userState {
  cognitoUser?: CognitoUser;
  user?: DecodedToken;
  loggedIn: boolean;
  savedLoginPath: string;
}

const initialState: userState = {
  cognitoUser: undefined,
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
    setCognitoUser: (state, action: PayloadAction<CognitoUser>) => {
      state.cognitoUser = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const getLoggedIn = (state: RootState) => state.user.loggedIn;
export const getUser = (state: RootState) => state.user.user;
export const getCognitoUser = (state: RootState) => state.user.cognitoUser;
export const getSavedLoginPath = (state: RootState) =>
  state.user.savedLoginPath;

export const {
  setLoggedIn,
  setSavedLoginPath,
  resetUser,
  setUser,
  setCognitoUser,
} = userSlice.actions;

export default userSlice.reducer;
