import React from 'react';
import PeopleSection from '../PeopleSection/PeopleSection';
import Header from '../Header/Header';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <main>
      <Header />
      <PeopleSection />
    </main>
  );
};

export default SearchPage;
