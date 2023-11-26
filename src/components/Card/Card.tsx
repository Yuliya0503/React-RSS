import React from 'react';
import { ICardPeopleProps } from '../../models/types';
import styles from './card.module.css';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Card: React.FC<ICardPeopleProps> = ({ person }) => {
  const router = useRouter();
  const id = person.url?.split('/').filter(Boolean).at(-1);
  const href = `${id}${router.asPath}`;

  return (
    <li key={id} className={styles.people_card}>
      <Link href={href} className={styles.links}>
        <CharacterInfo person={person} />
      </Link>
    </li>
  );
};

export default Card;
