import React from 'react';
import { IPeople } from '../models/ISWAPI';
import CardPeople from './CardPeople';
import { ISearchPageProps } from '../models/types';
import { ErrorMessage, NoResultMessage } from '../models/constants';

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
    return <p>{NoResultMessage}</p>;
  };

  render() {
    const { cards, error } = this.props;
    if (error) {
      return this.renderErrorMessage();
    }
    return (
      <div>
        {cards.length
          ? this.renderCardPeople(cards)
          : this.renderNoResultMessage()}
      </div>
    );
  }
}
