import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
export default loadSlice.reducer;
