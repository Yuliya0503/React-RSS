import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { searchTermLS } from '../../models/constants';

interface ISearchString {
  searchRootString: string;
}

const storedSearchTerm: string = localStorage.getItem(searchTermLS) || '';

const initialState: ISearchString = {
  searchRootString: storedSearchTerm,
};

export const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setRootSearch: (state, action: PayloadAction<string>) => {
      state.searchRootString = action.payload;
    },
  },
});

export default searchSlice.reducer;
