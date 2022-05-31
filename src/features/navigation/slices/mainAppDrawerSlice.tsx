import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export interface mainAppDrawerState {
  isDrawerOpen: boolean;
  drawerWidth: number;
}

const initialState: mainAppDrawerState = {
  isDrawerOpen: true,
  drawerWidth: 240,
};

export const mainAppDrawerSlice = createSlice({
  name: "mainAppDrawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = mainAppDrawerSlice.actions;

export const selectDrawerWidth = (state: RootState) =>
  state.mainAppDrawer.drawerWidth;
export const selectIsDrawerOpen = (state: RootState) =>
  state.mainAppDrawer.isDrawerOpen;

export default mainAppDrawerSlice.reducer;
