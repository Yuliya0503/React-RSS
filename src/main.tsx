import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { AppRouter } from './Router/router';
import { store } from './Store/Store';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  </StrictMode>
);
