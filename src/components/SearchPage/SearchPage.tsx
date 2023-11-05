import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISearchPageProps } from '../../models/types';
import styles from './SearchPage.module.css';
import ErrorSection from '../Error/ErrorSection';
import PeopleSection from '../PeopleSection/PeopleSection';
import NoResultSection from '../NoResultSection/NoResultSection';
import { IResponse } from '../../models/ISWAPI';
import getPeople from '../../API/CardService';

const SearchPage: React.FC<ISearchPageProps> = ({
  cards,
  error,
  countPages,
  setCards,
  setLoading,
}) => {
  const navigate = useNavigate();
  const paginationButton = Array.from({ length: countPages }, (_, i) => (
    <button key={i + 1} onClick={() => handlePageClick(i + 1)}>
      {i + 1}
    </button>
  ));

  async function handlePageClick(pageNumber: number) {
    navigate(`/page/${pageNumber}`);
    setLoading(true);
    const { results }: IResponse = await getPeople(pageNumber);
    setCards(results);
    setLoading(false);
  }

  return (
    <>
      <div className={styles.wrapper}>
        {error ? (
          <ErrorSection />
        ) : cards.length ? (
          <PeopleSection cards={cards} />
        ) : (
          <NoResultSection />
        )}
      </div>
      <div>{paginationButton}</div>
    </>
  );
};

export default SearchPage;
