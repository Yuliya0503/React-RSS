import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
export default PageItemsSlice.reducer;
