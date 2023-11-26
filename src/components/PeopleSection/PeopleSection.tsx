import { PropsWithChildren, useEffect, useState } from 'react';
import { IPeople, IResponse } from '../../models/ISWAPI';
import Card from '../Card/Card';
import NoResultSection from '../NoResultSection/NoResultSection';
import styles from './PeopleSection.module.css';
import Pagination from '../Pagination/Pagination';
import { Router, useRouter } from 'next/router';
import { encode } from 'querystring';
import { DEFAULT_LIMIT } from '@/src/models/constants';
import Loading from '../Loading/Loading';

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

  if (loading) return <Loading />;
  const searchParams = new URLSearchParams(encode(router.query));
  const persons = (people?.results || []).slice(
    0,
    Number(searchParams.get('limit')) || DEFAULT_LIMIT
  );

  return (
    <section className={styles.section_wrapper}>
      {persons.length === 0 ? (
        <NoResultSection />
      ) : (
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
      )}
    </section>
  );
};

export default PeopleSection;
