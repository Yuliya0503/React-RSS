import React from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';

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
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {data.map((card: IPeople) => (
            <Card key={card.url} person={card} />
          ))}
        </ul>
        <Outlet />
      </div>
      {children}
    </section>
  );
};

export default PeopleSection;
