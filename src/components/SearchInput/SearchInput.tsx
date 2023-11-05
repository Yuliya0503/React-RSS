import React, { useState } from 'react';
import { IResponse } from '../../models/ISWAPI';
import { ISearchInputProps } from '../../models/types';
//import { defaultSearch } from '../../models/constants';
import styles from './SearchInput.module.css';
import getPeople from '../../API/CardService';
import SearchField from '../SearchField/SearchField';
import SearchButton from '../SearchButton/SearchButton';

const SearchInput: React.FC<ISearchInputProps> = ({
  updateCards,
  setLoading,
  setError,
}) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearch = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const endPoint = searchTerm ? `?search=${searchTerm}` : '?page=1';
    console.log(endPoint);
    localStorage.setItem('lastSearch', searchTerm);
    try {
      setLoading(true);
      const { results }: IResponse = await getPeople(endPoint);
      updateCards(results);
      setLoading(false);
    } catch (error) {
      console.error(`Error: ${error}`);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <SearchField
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
      />
      <SearchButton />
    </form>
  );
};

export default SearchInput;
