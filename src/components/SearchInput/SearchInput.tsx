import React, { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import SearchField from './SearchField/SearchField';
import SearchButton from './SearchButton/SearchButton';
import { setRootSearch } from '../../Store/Reducers/SearchReduser';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoooks';

interface SearchInputProps {
  onClick: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const searchRootString = useAppSelector(
    (state) => state.searchSlice.searchRootString
  );
  const [inputValue, setInputValue] = useState<string>(searchRootString);

  const handleSearchClick = () => {
    const value = inputValue.trim();
    onClick(value);
    dispatch(setRootSearch(value));
  };

  useEffect(() => {
    setInputValue(searchRootString);
  }, [searchRootString]);

  return (
    <div className={styles.form}>
      <SearchField
        value={inputValue}
        onChange={(value) => setInputValue(value)}
      />
      <SearchButton onClick={handleSearchClick} />
    </div>
  );
};

export default SearchInput;
