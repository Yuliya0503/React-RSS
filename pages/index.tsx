import React from 'react';
import Header from '@/src/components/Header/Header';
import PeopleSection from '@/src/components/PeopleSection/PeopleSection';
import { wrapper } from '../src/Store/Store';
import { encode } from 'querystring';
import { getPeople, getRunningQueriesThunk } from '@/src/API/CardService';
import { IResponse } from '@/src/models/ISWAPI';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = new URLSearchParams(encode(context.query));
    store.dispatch(getPeople.initiate(searchParams.toString()));

    const [people] = await Promise.all(
      store.dispatch(getRunningQueriesThunk())
    );

    return {
      props: {
        people: people?.data || null,
      },
    };
  }
);
interface Props {
  people: IResponse;
}

const HomePage = ({ people }: Props): JSX.Element => (
  <>
    <Header />
    <PeopleSection people={people} />
  </>
);

export default HomePage;
