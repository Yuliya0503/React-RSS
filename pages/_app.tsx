import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from './layout';
import ErrorBoundary from '@/src/components/ErrorBoundary/ErrorBoundary';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <RootLayout>
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  </RootLayout>
);

export default App;
