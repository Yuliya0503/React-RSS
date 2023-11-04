import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorSection from './components/Error/ErrorSection';
import { IPeople } from './models/ISWAPI';
import fetchData from './helpers/fetchData';
import ErrorButton from './components/Error/ErrorButton';
import Loading from './components/Loading/Loading';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [cards, setCards] = useState<IPeople[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateCards = (newCards: IPeople[]) => setCards(newCards);

  useEffect(() => {
    fetchData(setCards, setLoading, setError, setErrorMessage);
  }, []);

  if (error) {
    return <ErrorSection />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary errorMessage={errorMessage}>
      <div className={styles.root}>
        <ErrorButton setError={setError} setErrorMessage={setErrorMessage} />
        <Header
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
