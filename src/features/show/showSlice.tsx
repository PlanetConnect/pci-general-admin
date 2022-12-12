import { Show } from "@pci/pci-services.types.show";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface showState {
  shows: Show[];
}

const initialState: showState = {
  shows: [],
};

export const showsReducer = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShows: (state, action: PayloadAction<Show[]>) => {
      state.shows = action.payload;
    },
    resetShows: () => initialState,
  },
});

export const getShows = (state: RootState) => state.shows.shows;

export const { setShows, resetShows } = showsReducer.actions;

export default showsReducer.reducer;
