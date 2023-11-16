import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './RootReduser';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
