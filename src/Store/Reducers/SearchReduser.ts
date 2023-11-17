import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../LocalStorage/getlocalStorage';
import { RootState } from '../RootReduser';
interface ISearchString {
  searchRootString: string;
}

const initialState: ISearchString = {
  searchRootString: getLocalStorage(),
};

const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setRootSearch: (state, action: PayloadAction<string>) => {
      state.searchRootString = action.payload;
    },
    setSearchCleared: (state) => {
      state.searchRootString = '';
    },
  },
});

export const { setRootSearch, setSearchCleared } = searchSlice.actions;
export const selectSearch = (state: RootState) =>
  state.searchSlice.searchRootString;
export default searchSlice.reducer;
