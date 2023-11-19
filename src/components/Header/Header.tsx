import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../../models/constants';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css';
import { setLocalStorage } from '../../LocalStorage/setLocalStorage';
import { pageCurrentUpdate } from '../../Store/Reducers/PageCurrentSlice';

const Header = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    setLocalStorage(value);

    pageCurrentUpdate(DEFAULT_PAGE);

    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const handleTitleClick = () => {
    pageCurrentUpdate(DEFAULT_PAGE);
  };

  const handleButtonClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    handleSearchClick();
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title_wrapper} onClick={handleTitleClick}>
        <h1 className={styles.title} onClick={handleButtonClick}>
          Star Wars
        </h1>
      </Link>
      <SearchInput />
    </header>
  );
};

export default Header;
