import React from 'react';
import { IPeople } from '../models/ISWAPI';
import CardPeople from './CardPeople';
import { ISearchPageProps } from '../models/types';
import { ErrorMessage, NoResultMessage } from '../models/constants';
import styles from './SearchPage.module.css';

const SearchPage: React.FC<ISearchPageProps> = ({ cards, error }) => {
  const renderErrorMessage = (): JSX.Element => {
    return <p>{ErrorMessage}</p>;
  };

  const renderCardPeople = (cards: IPeople[]): JSX.Element => {
    return (
      <section>
        {cards.map((card: IPeople) => (
          <CardPeople key={card.url} person={card} />
        ))}
      </section>
    );
  };

  const renderNoResultMessage = (): JSX.Element => {
    return <p className={styles.mess}>{NoResultMessage}</p>;
  };

  return (
    <div className={styles.wrapper}>
      {error ? (
        renderErrorMessage()
      ) : (
        <section className={styles.cards}>
          {cards.length ? renderCardPeople(cards) : renderNoResultMessage()}
        </section>
      )}
    </div>
  );
};

export default SearchPage;
