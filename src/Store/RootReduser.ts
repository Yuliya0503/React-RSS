import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';
import PeopleListReduser from './Reducers/PeopleListReduser';
import PageSliceReduser from './Reducers/PageSliceReduser';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
  peopleListSlice: PeopleListReduser,
  pageSlice: PageSliceReduser,
});

export type RootState = ReturnType<typeof rootReducer>;
