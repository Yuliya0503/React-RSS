import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';
import PeopleListReduser from './Reducers/PeopleListReduser';
import PageSliceReduser from './Reducers/PageSliceReduser';
import DetailSliceReduser from './Reducers/DetailsReduser';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
  peopleListSlice: PeopleListReduser,
  pageSlice: PageSliceReduser,
  detailsSlice: DetailSliceReduser,
});

export type RootState = ReturnType<typeof rootReducer>;
