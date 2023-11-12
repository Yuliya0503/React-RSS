import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<string>('');
export const SearchDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);

const searchTerm = localStorage.getItem('searchTerm');

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState(searchTerm || '');

  return (
    <SearchContext.Provider value={searchQuery}>
      <SearchDispatchContext.Provider value={setSearchQuery}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
