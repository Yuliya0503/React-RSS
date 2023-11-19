import { useEffect } from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import { Outlet } from 'react-router-dom';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';
import { useAppSelector } from '../../hooks/reduxHoooks';
import { selectPageItems } from '../../Store/Reducers/PageSliceReduser';
import { selectSearch } from '../../Store/Reducers/SearchReduser';
import { selectPage } from '../../Store/Reducers/PageCurrentSlice';
import { useGetPeopleQuery } from '../../API/CardService';
import Pagination from '../Pagination/Pagination';
import useActions from '../../hooks/useActions';
import NotFound from '../NotFound/NotFound';

const PeopleSection = () => {
  const { loadingSearchPage } = useActions();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectPageItems);
  const currentPage = useAppSelector(selectPage);

  const searchParams = new URLSearchParams();
  searchTerm && searchParams.append('search', searchTerm);
  limit && searchParams.append('limit', limit.toString());
  currentPage && searchParams.append('page', currentPage.toString());

  const { isFetching, data, isError } = useGetPeopleQuery(
    searchParams.toString()
  );

  useEffect(() => {
    loadingSearchPage(isFetching);
  }, [loadingSearchPage, isFetching]);

  if (isFetching) return <Loading />;
  if (isError) return <NotFound />;
  if (!data) return <NoResultSection />;
  const persons = [...data.results];
  if (!persons.length) return <NoResultSection />;
  persons.length = limit;

  return (
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {persons.map((card: IPeople) => (
            <Card key={card.url} person={card} />
          ))}
        </ul>
        <Outlet />
      </div>
      <Pagination totalItems={data.count} />
    </section>
  );
};

export default PeopleSection;
