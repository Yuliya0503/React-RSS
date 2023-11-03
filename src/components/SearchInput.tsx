import React, { useState } from 'react';
import { IResponse } from '../models/ISWAPI';
import PostService from '../API/CardService';
import { ISearchInputProps } from '../models/types';
import { defaultSearch } from '../models/constants';
import styles from './SearchInput.module.css';

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
    const endPoint: string = searchTerm
      ? `search=${searchTerm}`
      : defaultSearch;
    localStorage.setItem('lastSearch', searchTerm);
    try {
      setLoading(true);
      const { results }: IResponse = await PostService.getPeople(endPoint);
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
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={styles.input_btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
