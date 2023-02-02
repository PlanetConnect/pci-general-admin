import { Show } from "@pci/pci-services.types.show";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface showState {
  show?: Show;
  shows: Show[];
}

const initialState: showState = {
  show: undefined,
  shows: [],
};

export const showsReducer = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<Show>) => {
      state.show = action.payload;
    },
    setShows: (state, action: PayloadAction<Show[]>) => {
      state.shows = action.payload;
    },
    resetShows: () => initialState,
  },
});

export const getShow = (state: RootState) => state.shows.show;
export const getShows = (state: RootState) => state.shows.shows;

export const { setShow, setShows, resetShows } = showsReducer.actions;

export default showsReducer.reducer;
