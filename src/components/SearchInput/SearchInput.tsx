import React, { useRef } from 'react';
import styles from './SearchInput.module.css';
import SearchButton from './SearchButton/SearchButton';

interface SearchInputProps {
  onSearchClick: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchClick }) => {
  const textInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    onSearchClick(value);
  };

  return (
    <div className={styles.form}>
      <input ref={textInput} type="text" placeholder="Search" />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
};

export default SearchInput;
