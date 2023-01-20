import { Show } from "@pci/pci-services.types.show";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";

import { RootState } from "~/app/store";

export interface authState {
  accessToken: string;
  refreshToken: string;
  username: string;
  cognitoUser?: CognitoUser;
  currentShow?: Show;
}

const initialState: authState = {
  accessToken: "",
  refreshToken: "",
  username: "",
  cognitoUser: undefined,
  currentShow: undefined,
};

export const authSlice = createSlice({
  name: "auth",
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
    setCurrentShow: (state, action: PayloadAction<Show>) => {
      state.currentShow = action.payload;
    },
    resetTokens: () => initialState,
  },
});

export const getRefreshToken = (state: RootState) => state.auth.refreshToken;
export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const getUsername = (state: RootState) => state.auth.username;
export const getCognitoUser = (state: RootState) => state.auth.cognitoUser;
export const getCurrentShow = (state: RootState) => state.auth.currentShow;

export const {
  setAccessToken,
  setRefreshToken,
  resetTokens,
  setUsername,
  setCurrentShow,
} = authSlice.actions;

export default authSlice.reducer;
