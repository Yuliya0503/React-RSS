import { useRef } from 'react';
import styles from './SearchInput.module.css';
import SearchField from './SearchField/SearchField';
import SearchButton from './SearchButton/SearchButton';
import {
  selectSearch,
  setRootSearch,
} from '../../Store/Reducers/SearchReduser';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoooks';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../../models/constants';
import { useSearchParams } from 'react-router-dom';
import { pageCurrentUpdate } from '../../Store/Reducers/PageCurrentSlice';

const SearchInput = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchRootString = useAppSelector(selectSearch);

  const handleSearchChange = (value: string) => {
    dispatch(setRootSearch(value));
  };

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    dispatch(setRootSearch(value));
    dispatch(pageCurrentUpdate(DEFAULT_PAGE));
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
    textInput.current?.focus();
  };

  return (
    <div className={styles.form}>
      <SearchField
        value={searchRootString}
        defaultValue={searchRootString}
        onChange={handleSearchChange}
      />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
};

export default SearchInput;
