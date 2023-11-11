import React from 'react';
import { ICardPeopleProps } from '../../../models/types';

const CharacterInfo: React.FC<ICardPeopleProps> = ({ person }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <p>Gender: {person.gender}</p>
      <p>Birth Year: {person.birth_year}</p>
    </div>
  );
};

export default CharacterInfo;
