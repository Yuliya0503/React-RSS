import './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import ErrorButton from './components/Error/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorButton />
      <SearchPage />
    </ErrorBoundary>
  );
};

export default App;
