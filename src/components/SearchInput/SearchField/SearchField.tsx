import React from 'react';
import styles from './SearchField.module.css';

const SearchField: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchField;
