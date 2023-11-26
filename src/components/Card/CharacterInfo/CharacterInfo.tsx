import React from 'react';
import { ICardPeopleProps } from '../../../models/types';
import styles from './CharacterInfo.module.css';

const CharacterInfo: React.FC<ICardPeopleProps> = ({ person }) => {
  const { name, gender, birth_year } = person;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{name}</h2>
      <p>Gender: {gender}</p>
      <p>Birth Year: {birth_year}</p>
    </div>
  );
};

export default CharacterInfo;
