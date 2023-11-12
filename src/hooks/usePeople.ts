import { useEffect, useState, useRef } from 'react';
import { getPeople } from '../API/CardService';
import { usePeopleDispatch } from './usePeopleDispatch';

export function usePeope(
  searchTerm: string,
  currentPage: number,
  limit: number
) {
  const [isLoading, setIsLoading] = useState(false);
  const setPeople = usePeopleDispatch();

  const totalResults = useRef<number>(0);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetch = async () => {
      setIsLoading(true);
      localStorage.setItem('searchTerm', searchTerm);
      try {
        const { results, count } = await getPeople(
          currentPage,
          searchTerm,
          limit,
          { signal }
        );

        setPeople(results);
        totalResults.current = count;
        setIsLoading(false);
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') {
          setIsLoading(false);
        }
      }
    };
    fetch();

    return () => abortController.abort();
  }, [searchTerm, currentPage, limit, setPeople]);

  return [isLoading, totalResults.current] as const;
}
