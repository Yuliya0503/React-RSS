import React from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';

interface Props {
  isLoading: boolean;
  data: IPeople[];
  children: React.ReactNode;
  limit: number;
}

const PeopleSection = ({ isLoading, data, limit, children }: Props) => {
  if (isLoading) return <Loading />;
  if (!data.length) return <NoResultSection />;
  data.length = limit;

  return (
    <section>
      {children}
      <div>
        <ul>
          {data.map((card: IPeople) => (
            <Card key={card.url} person={card} />
          ))}
        </ul>
        <Outlet />
      </div>
    </section>
  );
};

export default PeopleSection;
