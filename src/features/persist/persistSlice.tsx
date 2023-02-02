import { Show } from "@pci/pci-services.types.show";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/app/store";

export interface PersistState {
  currentShowId: string;
  savedLoginPath: string;
}

const initialState: PersistState = {
  currentShowId: "",
  savedLoginPath: "",
};

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    setCurrentShowId: (state, action: PayloadAction<string>) => {
      state.currentShowId = action.payload;
    },
    setSavedLoginPath: (state, action: PayloadAction<string>) => {
      state.savedLoginPath = action.payload;
    },
    resetPersist: () => initialState,
  },
});

export const getCurrentShowId = (state: RootState) =>
  state.persist.currentShowId;
export const getCurrentShow = (state: RootState) => {
  if (state.persist.currentShowId) {
    // Get the current show from the queryApi store
    const query: any = state.queryApi.queries?.["getShows(undefined)"]?.data;
    const show = query?.data?.find(
      (show: Show) => show.show_id === state.persist.currentShowId
    );
    return show;
  }
  return undefined;
};
export const getSavedLoginPath = (state: RootState) =>
  state.persist.savedLoginPath;

export const { setSavedLoginPath, resetPersist, setCurrentShowId } =
  persistSlice.actions;

export default persistSlice.reducer;
