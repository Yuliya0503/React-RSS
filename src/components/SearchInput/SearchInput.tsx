import React, { Dispatch, SetStateAction, useRef } from 'react';
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

interface SearchInputProps {
  setPage: Dispatch<SetStateAction<number>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ setPage }) => {
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
    setPage(DEFAULT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
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
