import { PropsWithChildren, useEffect, useState } from 'react';
import { IPeople, IResponse } from '../../models/ISWAPI';
import Card from '../Card/Card';
import NoResultSection from '../NoResultSection/NoResultSection';
import styles from './PeopleSection.module.css';
import Pagination from '../Pagination/Pagination';
import { Router, useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { getSearchParams } from '@/src/helpers/getParams';

interface Props {
  people: IResponse;
}

const PeopleSection = ({ children, people }: PropsWithChildren<Props>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlerOn = () => setLoading(true);
    const handlerOff = () => setLoading(false);

    Router.events.on('routeChangeStart', handlerOn);
    Router.events.on('routeChangeComplete', handlerOff);
    Router.events.on('routeChangeError', handlerOff);

    return () => {
      Router.events.off('routeChangeStart', handlerOn);
      Router.events.off('routeChangeComplete', handlerOff);
      Router.events.off('routeChangeError', handlerOff);
    };
  }, []);

  const { limit } = getSearchParams(router.query);
  const persons = [...people.results];
  persons.length = limit;
  if (loading) return <Loading />;
  if (!persons.length) return <NoResultSection />;

  return (
    <section className={styles.section_wrapper}>
      <>
        <div className={styles.people_wrapper}>
          <ul className={styles.card_wrapper}>
            {persons.map((person: IPeople) => (
              <Card key={person.url} person={person} />
            ))}
          </ul>
          {children}
        </div>
        <Pagination key={router.asPath} totalItems={people?.count} />
      </>
    </section>
  );
};

export default PeopleSection;
