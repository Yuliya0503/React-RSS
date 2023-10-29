import React from 'react';
//import { ISearchPageState } from '../models/types';
//import SearchInput from './SearchInput';
import { IPeople } from '../models/ISWAPI';
import CardPeople from './CardPeople';

interface ISearchPage {
  cards: IPeople[];
  error: boolean;
}

export default class SearchPage extends React.Component<ISearchPage> {
  constructor(props: ISearchPage) {
    super(props);
  }
  render() {
    const { cards, error } = this.props;
    if (error) {
      return <p>error!!! reload page</p>;
    }
    return (
      <div>
        <section>
          {cards?.length ? (
            cards.map((card: IPeople) => (
              <CardPeople key={card.url} person={card} />
            ))
          ) : (
            <p>No result</p>
          )}
        </section>
      </div>
    );
  }
}
