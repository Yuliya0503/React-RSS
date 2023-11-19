import { combineReducers } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReduser';
import PageSliceReduser from './Reducers/PageSliceReduser';
import loadingReduser from './Reducers/loadingReduser';
import PageCurrentSlice from './Reducers/PageCurrentSlice';
import { apiPeople } from '../API/CardService';

export const rootReducer = combineReducers({
  searchSlice: searchSliceReducer,
  pageSlice: PageSliceReduser,
  loadingSlice: loadingReduser,
  pageCurrent: PageCurrentSlice,
  [apiPeople.reducerPath]: apiPeople.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
