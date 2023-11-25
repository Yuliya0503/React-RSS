import { useEffect } from 'react';
import { IPeople } from '../../models/ISWAPI';
import Card from '../Card/Card';
import NoResultSection from '../NoResultSection/NoResultSection';
import Loading from '../Loading/Loading';
import styles from './PeopleSection.module.css';
import { useGetPeopleQuery } from '../../API/CardService';
import Pagination from '../Pagination/Pagination';
import NotFound from '../NotFound/NotFound';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const searchTerm = (router.query.search as string) || '';
  const limit = Number(router.query.limit) || 10;
  const currentPage = Number(router.query.page) || 1;

  const searchParams = buildSearchParams(searchTerm, limit, currentPage);

  const { isFetching, data, isError } = useGetPeopleQuery(searchParams);

  useEffect(() => {}, [router.query]);

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
