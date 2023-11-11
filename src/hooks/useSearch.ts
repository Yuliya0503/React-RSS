import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContext';

export const useSearch = (): string => {
  const search = useContext(SearchContext) as string | undefined;

  if (!search) {
    throw new Error('Search context is not provided');
  }

  return search;
};
