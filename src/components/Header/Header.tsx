import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import { ISearchInputProps } from '../../models/types';
import styles from './Header.module.css';

const Header: React.FC<ISearchInputProps> = (props) => {
  const { updateCards, setLoading, setError } = props;
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Star Wars</h1>
      <SearchInput
        updateCards={updateCards}
        setError={setError}
        setLoading={setLoading}
      />
    </header>
  );
};

export default Header;
