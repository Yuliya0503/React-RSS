import React from 'react';
import styles from './SearchButton.module.css';

const SearchButton: React.FC = () => {
  return (
    <button className={styles.input_btn} type="submit">
      Search
    </button>
  );
};

export default SearchButton;
