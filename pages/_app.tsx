import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/src/Store/Store';
import RootLayout from './layout';
import ErrorBoundary from '@/src/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '@/src/components/Error/ErrorButton';
import '../src/styles/index.css';

const ProviderStore: React.FC<PropsWithChildren> = ({ children }) => {
  const { store } = wrapper.useWrappedStore({});
  return <Provider store={store}>{children}</Provider>;
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ProviderStore>
    <RootLayout>
      <ErrorBoundary>
        <ErrorButton />
        <Component {...pageProps} />
      </ErrorBoundary>
    </RootLayout>
  </ProviderStore>
);

export default App;
