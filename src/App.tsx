import './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import ErrorButton from './components/Error/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './Store/Store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ErrorButton />
        <SearchPage />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
