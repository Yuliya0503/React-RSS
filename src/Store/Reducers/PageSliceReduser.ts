import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../RootReduser';

interface IPageItems {
  limit: number;
}

const initialState: IPageItems = {
  limit: 10,
};

const PageItemsSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setPageItems: (state: IPageItems, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const { setPageItems } = PageItemsSlice.actions;
export const selectPageItems = (state: RootState) => state.pageSlice.limit;
export default PageItemsSlice.reducer;
