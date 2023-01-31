import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface authState {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  username: string;
}

const initialState: authState = {
  idToken: "",
  accessToken: "",
  refreshToken: "",
  expiresAt: 0,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setExpiresAt: (state, action: PayloadAction<number>) => {
      state.expiresAt = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    resetTokens: () => initialState,
  },
});

export const getIdToken = (state: RootState) => state.auth.idToken;
export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const getRefreshToken = (state: RootState) => state.auth.refreshToken;
export const getExpiresAt = (state: RootState) => state.auth.expiresAt;
export const getUsername = (state: RootState) => state.auth.username;

export const {
  setIdToken,
  setAccessToken,
  setRefreshToken,
  setExpiresAt,
  resetTokens,
  setUsername,
} = authSlice.actions;

export default authSlice.reducer;
