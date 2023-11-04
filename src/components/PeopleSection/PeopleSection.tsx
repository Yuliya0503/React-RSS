import React from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';

const PeopleSection: React.FC<{ cards: IPeople[] }> = ({ cards }) => (
  <section>
    {cards.map((card: IPeople) => (
      <Card key={card.url} person={card} />
    ))}
  </section>
);

export default PeopleSection;
