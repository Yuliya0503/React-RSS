import React from 'react';
import { ICardPeopleProps } from '../../models/types';
import styles from './cardPeople.module.css';
import PlanetInfo from '../PlanetInfo/PlanetInfo';
import CharacterInfo from '../CharacterInfo/CharacterInfo';

const CardPeople: React.FC<ICardPeopleProps> = ({ person }) => {
  return (
    <div className={styles.people_card}>
      <CharacterInfo person={person} />
      <PlanetInfo homeworld={person.homeworld} />
    </div>
  );
};

export default CardPeople;
