import './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import ErrorButton from './components/Error/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchProvider from './Context/SearchContext';

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorButton />
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    </ErrorBoundary>
  );
};

export default App;
