import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from './layout';
import ErrorBoundary from '@/src/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '@/src/components/Error/ErrorButton';
import '../src/styles/index.css';
import { Provider } from 'react-redux';
import store from '@/src/Store/Store';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <RootLayout>
    <ErrorBoundary>
      <Provider store={store}>
        <ErrorButton />
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  </RootLayout>
);

export default App;
