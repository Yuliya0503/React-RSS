import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContext';

export const useSearch = (): string => {
  const search = useContext(SearchContext) as string;

  return search;
};
