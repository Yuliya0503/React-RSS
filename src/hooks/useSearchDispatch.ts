import { useContext } from 'react';
import { SearchDispatchContext } from '../Context/SearchContext';

export const useSearchDispatch = () => {
  const setSearchQuery = useContext(SearchDispatchContext);

  return setSearchQuery;
};
