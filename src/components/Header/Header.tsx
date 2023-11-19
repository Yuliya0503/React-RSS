import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../../models/constants';
import styles from './Header.module.css';
import { setLocalStorage } from '../../LocalStorage/setLocalStorage';
import { useAppSelector } from '../../hooks/reduxHoooks';
import { selectSearch } from '../../Store/Reducers/SearchReduser';
import SearchButton from '../SearchInput/SearchButton/SearchButton';
import useActions from '../../hooks/useActions';

const Header = (): JSX.Element => {
  const textInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRootSearch, pageCurrentUpdate } = useActions();
  const searchTerm: string = useAppSelector(selectSearch);

  const handleSearchClick = () => {
    const value: string = textInput.current?.value.trim() || '';
    setLocalStorage(value);
    setRootSearch(value);
    pageCurrentUpdate(DEFAULT_PAGE);

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
