import React from 'react';
import { ICardPeopleProps } from '../../models/types';

const CharacterInfo: React.FC<ICardPeopleProps> = ({ person }) => {
  return (
    <div>
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
};

export default CharacterInfo;
