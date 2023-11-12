import './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import ErrorButton from './components/Error/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchProvider from './Context/SearchContext';
import PeopleProvider from './Context/PeopleContext';
const App = () => {
  return (
    <ErrorBoundary>
      <ErrorButton />
      <SearchProvider>
        <PeopleProvider>
          <SearchPage />
        </PeopleProvider>
      </SearchProvider>
    </ErrorBoundary>
  );
};

export default App;
