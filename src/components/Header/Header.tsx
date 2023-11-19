import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../../models/constants';
import styles from './Header.module.css';
import { setLocalStorage } from '../../LocalStorage/setLocalStorage';
import { pageCurrentUpdate } from '../../Store/Reducers/PageCurrentSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoooks';
import {
  selectSearch,
  setRootSearch,
} from '../../Store/Reducers/SearchReduser';
import SearchButton from '../SearchInput/SearchButton/SearchButton';

const Header = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearch);
  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    setLocalStorage(value);
    dispatch(setRootSearch(value));
    dispatch(pageCurrentUpdate(DEFAULT_PAGE));

    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const handleButtonClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    handleSearchClick();
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title_wrapper}>
        <h1 className={styles.title} onClick={handleButtonClick}>
          Star Wars
        </h1>
      </Link>
      <div className={styles.form}>
        <input
          ref={textInput}
          defaultValue={searchTerm}
          className={styles.input}
        />
        <SearchButton onClick={handleSearchClick} />
      </div>
    </header>
  );
};

export default Header;
