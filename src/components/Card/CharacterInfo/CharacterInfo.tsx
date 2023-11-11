import React from 'react';
import { ICardPeopleProps } from '../../../models/types';
import styles from './CharacterInfo.module.css';

const CharacterInfo: React.FC<ICardPeopleProps> = ({ person }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{person.name}</h2>
      <p>Gender: {person.gender}</p>
      <p>Birth Year: {person.birth_year}</p>
    </div>
  );
};

export default CharacterInfo;
