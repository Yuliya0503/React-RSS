import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import SearchPage from './components/SearchPage';
import SearchResult from './components/SearchResults';
import { IPeople, IResponse } from './models/ISWAPI';
import { ErrorMessage, defaultSearch } from './models/constants';
import ErrorBoundary from './components/ErrorBoundary';
import getPeople from './API/CardService';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [cards, setCards] = useState<IPeople[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateCards = (newCards: IPeople[]) => setCards(newCards);

  const fetchData = async (options?: string) => {
    try {
      const { results }: IResponse = await getPeople(options);
      setCards(results);
      setLoading(false);
    } catch (error) {
      console.error(`Error: ${error}`);
      setErrorMessage(error instanceof Error ? error.message : '');
      setLoading(false);
      setError(true);
    }
  };

  const generateError = () => {
    try {
      throw new Error('Oops! Error!');
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setError(true);
      } else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `search=${lastSearch}` : defaultSearch;
    fetchData(searchParam);
  }, []);

  const renderLoading = () => {
    return <p className={styles.loading}>Loading...</p>;
  };

  const renderError = () => {
    return (
      <ErrorBoundary errorMessage={errorMessage}>
        <p className={styles.errorMess}>{ErrorMessage}</p>
      </ErrorBoundary>
    );
  };

  if (error) {
    return renderError();
  }

  if (loading) {
    return renderLoading();
  }

  return (
    <ErrorBoundary>
      <div className={styles.root}>
        <button className={styles.errBtn} onClick={generateError}>
          Oops! Error!
        </button>
        <SearchResult
          updateCards={updateCards}
          setLoading={setLoading}
          setError={setError}
        />
        <SearchPage cards={cards} error={error} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
