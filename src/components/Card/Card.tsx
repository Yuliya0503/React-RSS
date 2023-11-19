import React from 'react';
import { ICardPeopleProps } from '../../models/types';
import styles from './card.module.css';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import LinkWithQueryParams from '../../Router/LinkWithQueryParams';

const Card: React.FC<ICardPeopleProps> = ({ person }) => {
  const id: string | undefined = person.url.split('/').filter(Boolean).at(-1);
  return (
    <li key={id} className={styles.people_card}>
      <LinkWithQueryParams to={id || ''}>
        <CharacterInfo person={person} />
      </LinkWithQueryParams>
    </li>
  );
};

export default Card;
