import React, { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import SearchField from './SearchField/SearchField';
import SearchButton from './SearchButton/SearchButton';
import { useSearch } from '../../hooks/useSearch';

interface SearchInputProps {
  onClick: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClick }) => {
  const searchTerm = useSearch();
  const [inputValue, setInputValue] = useState<string>(searchTerm);

  const handleSearchClick = () => {
    const value = inputValue.trim();
    onClick(value);
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className={styles.form}>
      <SearchField
        value={inputValue}
        onChange={(value) => setInputValue(value)}
      />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
};

export default SearchInput;
