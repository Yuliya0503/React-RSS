import { useRef, useState } from 'react';
import { DEFAULT_LIMIT } from '../../models/constants';
import styles from './Header.module.css';
import SearchButton from '../SearchInput/SearchButton/SearchButton';
import { NextRouter, useRouter } from 'next/router';
import { setLocalStorage } from '@/src/LocalStorage/setLocalStorage';

const Header = (): JSX.Element => {
  const textInput = useRef<HTMLInputElement>(null);
  const router: NextRouter = useRouter();
  const [search, setSearch] = useState<number | string>(
    Number(router.query.search) || ''
  );

  const handleSearchClick = () => {
    const searchTerm = textInput.current?.value.trim() || '';
    setSearch(searchTerm);
    setLocalStorage(searchTerm);
    router.push({
      pathname: '/',
      query: { search: searchTerm, limit: router.query.limit || DEFAULT_LIMIT },
    });
  };

  const handleButtonClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    handleSearchClick();
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.title_wrapper} onClick={handleButtonClick}>
        <h1 className={styles.title}>Star Wars</h1>
      </a>
      <div className={styles.form}>
        <input ref={textInput} defaultValue={search} className={styles.input} />
        <SearchButton onClick={handleSearchClick} />
      </div>
    </header>
  );
};

export default Header;
