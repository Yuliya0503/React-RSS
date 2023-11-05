import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import SearchPage from './components/SearchPage/SearchPage';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorSection from './components/Error/ErrorSection';
import { IPeople, IResponse } from './models/ISWAPI';
//import fetchData from './helpers/fetchData';
import ErrorButton from './components/Error/ErrorButton';
import Loading from './components/Loading/Loading';
import getPeople from './API/CardService';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const defaultSearch = '?page=1';
  const lastSearch = localStorage.getItem('lastSearch');
  const searchParam = lastSearch ? `?search=${lastSearch}` : defaultSearch;
  const [cards, setCards] = useState<IPeople[]>([]);
  const [countPages, setCountPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateCards = (newCards: IPeople[]) => setCards(newCards);

  useEffect(() => {
    const fetchData = async (path: string) => {
      const arr = path.split('/');
      const pageNumber = arr[arr.length - 1] || 1;
      try {
        const { results, count }: IResponse = await getPeople(pageNumber);
        setCards(results);
        setCountPages(Math.ceil(count / 10));
        setLoading(false);
      } catch (error) {
        console.error('error get data:', error);
        setLoading(false);
        setError(true);
      }
    };
    fetchData(location.pathname);
  }, [searchParam, location.pathname]);

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
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                cards={cards}
                error={error}
                countPages={countPages}
                setCards={setCards}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/page/:pageNumber"
            element={
              <SearchPage
                cards={cards}
                error={error}
                countPages={countPages}
                setCards={setCards}
                setLoading={setLoading}
              />
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
