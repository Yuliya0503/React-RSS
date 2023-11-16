import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchInput.module.css';
import SearchField from './SearchField/SearchField';
import SearchButton from './SearchButton/SearchButton';
import { setRootSearch } from '../../Store/Reducers/SearchReduser';
import { RootState } from '../../Store/RootReduser';

interface SearchInputProps {
  onClick: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const searchRootString = useSelector(
    (state: RootState) => state.searchSlice.searchRootString
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
