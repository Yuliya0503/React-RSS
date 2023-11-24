import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from './layout';
import ErrorBoundary from '@/src/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '@/src/components/Error/ErrorButton';
import '../src/styles/index.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <RootLayout>
    <ErrorBoundary>
      <ErrorButton />
      <Component {...pageProps} />
    </ErrorBoundary>
  </RootLayout>
);

export default App;
