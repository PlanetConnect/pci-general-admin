import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";

import { RootState } from "~/app/store";

export interface loginTokenState {
  accessToken: string;
  refreshToken: string;
  username: string;
  cognitoUser?: CognitoUser;
  sessionUserAttributes?: any;
}

const initialState: loginTokenState = {
  accessToken: "",
  refreshToken: "",
  username: "",
  cognitoUser: undefined,
  sessionUserAttributes: {},
};

export const loginTokenSlice = createSlice({
  name: "loginTokens",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setCognitoUser: (state, action: PayloadAction<CognitoUser>) => {
      state.cognitoUser = action.payload;
    },
    setSessionUserAttributes: (state, action: PayloadAction<any>) => {
      state.sessionUserAttributes = action.payload;
    },
    resetTokens: () => initialState,
  },
});

export const getRefreshToken = (state: RootState) =>
  state.loginTokens.refreshToken;
export const getAccessToken = (state: RootState) =>
  state.loginTokens.accessToken;
export const getUsername = (state: RootState) => state.loginTokens.username;
export const getCognitoUser = (state: RootState) =>
  state.loginTokens.cognitoUser;
export const getSessionUserAttributes = (state: RootState) =>
  state.loginTokens.sessionUserAttributes;

export const {
  setAccessToken,
  setRefreshToken,
  resetTokens,
  setUsername,
  setCognitoUser,
  setSessionUserAttributes,
} = loginTokenSlice.actions;

export default loginTokenSlice.reducer;
