import { Middleware, configureStore } from '@reduxjs/toolkit';
import { apiPeople } from '../API/CardService';
import { createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: { [apiPeople.reducerPath]: apiPeople.reducer },
  middleware: (getDefaultMiddleware) => {
    const additionalMiddleware: Middleware[] = [apiPeople.middleware];
    return getDefaultMiddleware().concat(additionalMiddleware);
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(() => store);
export default store;
