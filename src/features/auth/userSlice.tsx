import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface userState {
  user?: DecodedToken;
  loggedIn: boolean;
}

const initialState: userState = {
  user: undefined,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<DecodedToken>) => {
      state.user = action.payload;
    },

    resetUser: () => initialState,
  },
});

export const getLoggedIn = (state: RootState) => state.user.loggedIn;
export const getUser = (state: RootState) => state.user.user;

export const { setLoggedIn, resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
