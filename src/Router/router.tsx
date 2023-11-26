import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
import Details from '../components/Details/Details';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path=":id" errorElement={<NotFound />} element={<Details />} />
    </Route>
  )
);
