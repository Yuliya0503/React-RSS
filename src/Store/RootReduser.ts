import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
});
