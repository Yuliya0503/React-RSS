import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../RootReducer';

interface IPageCurrent {
  currentPage: number;
}

const initialState: IPageCurrent = {
  currentPage: 1,
};

const PageCurrentSlice = createSlice({
  name: 'pageCurrent',
  initialState,
  reducers: {
    pageCurrentUpdate(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { pageCurrentUpdate } = PageCurrentSlice.actions;
export const selectPage = (state: RootState) => state.pageCurrent.currentPage;
export default PageCurrentSlice.reducer;
