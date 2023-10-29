import React from 'react';
import { IPeople } from '../models/ISWAPI';
import CardPeople from './CardPeople';
import { ISearchPageProps } from '../models/types';
import { ErrorMessage, NoResultMessage } from '../models/constants';
import styles from './SearchPage.module.css';

export default class SearchPage extends React.Component<ISearchPageProps> {
  renderErrorMessage = () => {
    return <p>{ErrorMessage}</p>;
  };

  renderCardPeople = (cards: IPeople[]) => {
    return (
      <section>
        {cards.map((card: IPeople) => (
          <CardPeople key={card.url} person={card} />
        ))}
      </section>
    );
  };

  renderNoResultMessage = () => {
    return <p className={styles.mess}>{NoResultMessage}</p>;
  };

  render() {
    const { cards, error } = this.props;
    if (error) {
      return this.renderErrorMessage();
    }
    return (
      <div className={styles.wrapper}>
        <section className={styles.cards}>
          {cards.length
            ? this.renderCardPeople(cards)
            : this.renderNoResultMessage()}
        </section>
      </div>
    );
  }
}
