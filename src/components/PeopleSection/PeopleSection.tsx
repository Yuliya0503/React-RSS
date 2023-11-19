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

const PeopleSection = (): JSX.Element => {
  const { loadingSearchPage } = useActions();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectPageItems);
  const currentPage = useAppSelector(selectPage);

  const buildSearchParams = (): string => {
    const searchParams = new URLSearchParams();
    searchTerm && searchParams.append('search', searchTerm);
    limit && searchParams.append('limit', limit.toString());
    currentPage && searchParams.append('page', currentPage.toString());
    return searchParams.toString();
  };

  const { isFetching, data, isError } = useGetPeopleQuery(buildSearchParams());

  useEffect(() => {
    loadingSearchPage(isFetching);
  }, [loadingSearchPage, isFetching]);

  if (isFetching) return <Loading />;
  if (isError) return <NotFound />;
  if (!data) return <NoResultSection />;

  const { results: persons = [], count } = data;
  const truncatedPersons: IPeople[] = persons.slice(0, limit);

  if (!truncatedPersons.length) return <NoResultSection />;

  return (
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {truncatedPersons.map((person: IPeople) => (
            <Card key={person.url} person={person} />
          ))}
        </ul>
        <Outlet />
      </div>
      <Pagination totalItems={count} />
    </section>
  );
};

export default PeopleSection;
