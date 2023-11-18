import React from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';
import { usePeopleContext } from '../../hooks/usePeopleContext';
import { RootState } from '../../Store/RootReduser';

interface PeopleSectionProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const PeopleSection = ({ isLoading, children }: PeopleSectionProps) => {
  const limit = useSelector((state: RootState) => state.pageSlice.limit);
  const data = usePeopleContext();

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
