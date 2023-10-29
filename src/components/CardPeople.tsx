import React from 'react';
import { IPeople } from '../models/ISWAPI';

interface ICardPeopleProps {
  person: IPeople;
}

export default class CardPeople extends React.Component<ICardPeopleProps> {
  constructor(props: ICardPeopleProps) {
    super(props);
  }

  render() {
    const { person } = this.props;
    return (
      <div className="people-card">
        <h2>{person.name}</h2>
        <p>Gender: {person.gender}</p>
        <p>Birth Year: {person.birth_year}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <p>Height: {person.height} cm</p>
        <p>Mass: {person.mass} kg</p>
      </div>
    );
  }
}
