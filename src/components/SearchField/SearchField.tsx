import React from 'react';
import styles from './SearchField.module.css';

const SearchField: React.FC<{
  searchTerm: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchTerm, handleInputChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchField;
