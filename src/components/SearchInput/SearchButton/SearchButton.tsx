import React from 'react';
import styles from './SearchButton.module.css';

const SearchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className={styles.input_btn} onClick={onClick}>
      Search
    </button>
  );
};

export default SearchButton;
