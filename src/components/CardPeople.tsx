import React from 'react';
import { ICardPeopleProps } from '../models/types';
import styles from './cardPeople.module.css';

export default class CardPeople extends React.Component<ICardPeopleProps> {
  constructor(props: ICardPeopleProps) {
    super(props);
  }

  render() {
    const { person } = this.props;
    return (
      <div className={styles.people_card}>
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
