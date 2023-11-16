import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPeople } from '../../models/ISWAPI';

interface IPeopleList {
  peopleList: IPeople[];
}

const initialState: IPeopleList = {
  peopleList: [],
};

const peopleListSlice = createSlice({
  name: 'PeopleList',
  initialState,
  reducers: {
    setPeopleList: (state, action: PayloadAction<IPeople[]>) => {
      state.peopleList = action.payload;
    },
  },
});

export const { setPeopleList } = peopleListSlice.actions;
export default peopleListSlice.reducer;
