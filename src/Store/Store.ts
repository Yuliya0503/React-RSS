import { Middleware, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './RootReducer';
import { apiPeople } from '../API/CardService';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const additionalMiddleware: Middleware[] = [apiPeople.middleware];
    return getDefaultMiddleware().concat(additionalMiddleware);
  },
});

export type AppDispatch = (typeof store)['dispatch'];

export default store;
