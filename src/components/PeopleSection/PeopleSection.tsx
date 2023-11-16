import React, { useEffect } from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';
import { usePeopleContext } from '../../hooks/usePeopleContext';
import { setPeopleList } from '../../Store/Reducers/PeopleListReduser';
import { RootState } from '../../Store/RootReduser';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHoooks';

interface PeopleSectionProps {
  isLoading: boolean;
  children: React.ReactNode;
  limit: number;
}

const PeopleSection = ({ isLoading, limit, children }: PeopleSectionProps) => {
  const dispatch = useAppDispatch();
  const peopleList = useAppSelector(
    (state: RootState) => state.peopleListSlice.peopleList
  );
  const data = usePeopleContext();

  useEffect(() => {
    dispatch(setPeopleList(data));
  }, [data, dispatch]);

  if (isLoading) return <Loading />;
  if (!peopleList.length) return <NoResultSection />;
  const limitedData = peopleList.slice(0, limit);

  return (
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {limitedData.map((card: IPeople) => (
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
