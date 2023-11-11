import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { AppRouter } from './Router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={AppRouter} />
);
