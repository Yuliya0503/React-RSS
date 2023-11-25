import { useEffect } from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
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

const buildSearchParams = (
  searchTerm: string,
  limit: number,
  currentPage: number
): string => {
  const searchParams = new URLSearchParams();
  searchTerm && searchParams.append('search', searchTerm);
  limit && searchParams.append('limit', limit.toString());
  currentPage && searchParams.append('page', currentPage.toString());
  return searchParams.toString();
};

const PeopleSection = (): JSX.Element => {
  const { loadingSearchPage } = useActions();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectPageItems);
  const currentPage = useAppSelector(selectPage);

  const searchParams = buildSearchParams(searchTerm, limit, currentPage);

  const { isFetching, data, isError } = useGetPeopleQuery(searchParams);

  useEffect(() => {
    loadingSearchPage(isFetching);
  }, [loadingSearchPage, isFetching]);

  if (isFetching) return <Loading />;
  if (isError) return <NotFound />;

  const { results: persons = [], count } = data || {};
  const truncatedPersons: IPeople[] = persons.slice(0, limit);

  return (
    <section className={styles.section_wrapper}>
      {truncatedPersons.length === 0 ? (
        <NoResultSection />
      ) : (
        <>
          <div className={styles.people_wrapper}>
            <ul className={styles.card_wrapper}>
              {truncatedPersons.map((person: IPeople) => (
                <Card key={person.url} person={person} />
              ))}
            </ul>
          </div>
          <Pagination totalItems={count as number} />
        </>
      )}
    </section>
  );
};

export default PeopleSection;
