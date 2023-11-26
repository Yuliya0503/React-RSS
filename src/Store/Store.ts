import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiPeople } from '../API/CardService';
import { createWrapper } from 'next-redux-wrapper';

const middleware = [...getDefaultMiddleware(), apiPeople.middleware];

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiPeople.reducerPath]: apiPeople.reducer,
    },
    middleware,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
