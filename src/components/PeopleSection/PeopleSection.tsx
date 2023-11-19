import { useEffect } from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoooks';
import { selectPageItems } from '../../Store/Reducers/PageSliceReduser';
import { selectSearch } from '../../Store/Reducers/SearchReduser';
import { selectPage } from '../../Store/Reducers/PageCurrentSlice';
import { useGetPeopleQuery } from '../../API/CardService';
import { loadingSearchPage } from '../../Store/Reducers/loadingReduser';
import Pagination from '../Pagination/Pagination';

const PeopleSection = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectPageItems);
  const currentPage = useAppSelector(selectPage);

  const searchParams = new URLSearchParams();
  searchTerm && searchParams.append('search', searchTerm);
  limit && searchParams.append('limit', limit.toString());
  currentPage && searchParams.append('page', currentPage.toString());

  const { isLoading, data } = useGetPeopleQuery(searchParams.toString() || '', {
    skip: !searchParams.toString(),
  });

  const persons = data?.results || [];

  useEffect(() => {
    dispatch(loadingSearchPage(isLoading));
  }, [dispatch, isLoading]);

  if (isLoading) return <Loading />;
  if (!persons.length) return <NoResultSection />;

  return (
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {persons.slice(0, limit).map((card: IPeople) => (
            <Card key={card.url} person={card} />
          ))}
        </ul>
        <Outlet />
      </div>
      <Pagination totalItems={82} />
    </section>
  );
};

export default PeopleSection;
