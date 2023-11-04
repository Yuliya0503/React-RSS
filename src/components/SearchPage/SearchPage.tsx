import React from 'react';
import { ISearchPageProps } from '../../models/types';
import styles from './SearchPage.module.css';
import ErrorSection from '../Error/ErrorSection';
import PeopleSection from '../PeopleSection/PeopleSection';
import NoResultSection from '../NoResultSection/NoResultSection';

const SearchPage: React.FC<ISearchPageProps> = ({ cards, error }) => {
  return (
    <div className={styles.wrapper}>
      {error ? (
        <ErrorSection />
      ) : cards.length ? (
        <PeopleSection cards={cards} />
      ) : (
        <NoResultSection />
      )}
    </div>
  );
};

export default SearchPage;
