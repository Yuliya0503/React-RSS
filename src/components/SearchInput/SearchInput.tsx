import React, { useState } from 'react';
import { IResponse } from '../../models/ISWAPI';
import { ISearchInputProps } from '../../models/types';
import styles from './SearchInput.module.css';
import getPeople from '../../API/CardService';
import SearchField from '../SearchField/SearchField';
import SearchButton from '../SearchButton/SearchButton';
import { useNavigate } from 'react-router-dom';

const SearchInput: React.FC<ISearchInputProps> = ({
  updateCards,
  setLoading,
  setError,
}) => {
  const navigate = useNavigate();
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
    const searchQuery = searchTerm.trim();
    const endPoint = searchQuery ? `?search=${searchQuery}` : '?page=1';
    if (searchQuery) {
      navigate(`/?search=${searchQuery}`);
      console.log('EendPoint', searchQuery);

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
