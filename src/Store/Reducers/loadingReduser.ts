import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../RootReduser';

interface ILoadingState {
  loading: {
    details: boolean;
    searchPage: boolean;
  };
}

const initialState: ILoadingState = {
  loading: {
    details: false,
    searchPage: false,
  },
};

const loadSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingdetails: (state: ILoadingState, action: PayloadAction<boolean>) => {
      state.loading.details = action.payload;
    },
    loadingSearchPage: (
      state: ILoadingState,
      action: PayloadAction<boolean>
    ) => {
      state.loading.searchPage = action.payload;
    },
  },
});

export const { loadingdetails, loadingSearchPage } = loadSlice.actions;
export const selectLoadingDetails = (state: RootState) =>
  state.loadingSlice.loading.details;
export const selectLoadingSearchPage = (state: RootState) =>
  state.loadingSlice.loading.searchPage;
export default loadSlice.reducer;
