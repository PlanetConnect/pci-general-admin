import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface mainAppDrawerState {
  isDrawerOpen: boolean;
  drawerWidth: number;
}

const initialState: mainAppDrawerState = {
  isDrawerOpen: true,
  drawerWidth: 240,
};

export const mainAppDrawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state: any) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state: any) => {
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
