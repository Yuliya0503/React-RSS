import React, { PropsWithChildren, useEffect, useState } from 'react';
import { IPeople, IResponse } from '../../models/ISWAPI';
import Card from '../Card/Card';
import NoResultSection from '../NoResultSection/NoResultSection';
import styles from './PeopleSection.module.css';
import Pagination from '../Pagination/Pagination';
import { useRouter } from 'next/router';
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

    router.events.on('routeChangeStart', handlerOn);
    router.events.on('routeChangeComplete', handlerOff);
    router.events.on('routeChangeError', handlerOff);

    return () => {
      router.events.off('routeChangeStart', handlerOn);
      router.events.off('routeChangeComplete', handlerOff);
      router.events.off('routeChangeError', handlerOff);
    };
  }, [router]);

  const { results, count } = people || {};
  const persons = results || [];

  if (loading) return <Loading />;
  if (!persons.length) return <NoResultSection />;

  return (
    <section className={styles.section_wrapper}>
      <div className={styles.people_wrapper}>
        <ul className={styles.card_wrapper}>
          {persons.map((person: IPeople) => (
            <Card key={person.url} person={person} />
          ))}
        </ul>
        {children}
      </div>
      <Pagination key={router.asPath} totalItems={count || 0} />
    </section>
  );
};

export default PeopleSection;
