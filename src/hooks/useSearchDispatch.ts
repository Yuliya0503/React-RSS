import { useContext } from 'react';
import { SearchDispatchContext } from '../Context/SearchContext';

export const useSearchDispatch = () => {
  const setSearchQuery = useContext(SearchDispatchContext);
  if (!setSearchQuery) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }
  return setSearchQuery;
};
