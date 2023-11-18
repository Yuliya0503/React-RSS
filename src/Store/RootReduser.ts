import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';
import PeopleListReduser from './Reducers/PeopleListReduser';
import PageSliceReduser from './Reducers/PageSliceReduser';
import DetailSliceReduser from './Reducers/DetailsReduser';
import loadingReduser from './Reducers/loadingReduser';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
  peopleListSlice: PeopleListReduser,
  pageSlice: PageSliceReduser,
  detailsSlice: DetailSliceReduser,
  loadingSlice: loadingReduser,
});

export type RootState = ReturnType<typeof rootReducer>;
