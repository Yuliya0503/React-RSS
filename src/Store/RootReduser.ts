import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';
import PeopleListReduser from './Reducers/PeopleListReduser';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
  peopleListSlice: PeopleListReduser,
});

export type RootState = ReturnType<typeof rootReducer>;
