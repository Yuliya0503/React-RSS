import React from 'react';
import Header from '@/src/components/Header/Header';
//import PeopleSection from '@/src/components/PeopleSection/PeopleSection';
import Pagination from '@/src/components/Pagination/Pagination';

const HomePage = (): JSX.Element => (
  <>
    <Header />
    <Pagination totalItems={3} />
  </>
);

export default HomePage;
