import React, { useState } from 'react';
import styles from './SearchInput.module.css';
import SearchField from './SearchField/SearchField';
import SearchButton from './SearchButton/SearchButton';

interface SearchInputProps {
  onClick: (searchTerm: string) => void;
  searchTerm: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClick, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearchClick = () => {
    onClick(inputValue.trim());
  };

  return (
    <div className={styles.form}>
      <SearchField value={inputValue} onChange={handleInputChange} />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
};

export default SearchInput;
