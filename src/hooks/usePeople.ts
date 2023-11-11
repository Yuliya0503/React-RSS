import { useEffect, useState, useRef } from 'react';
import { getPeople } from '../API/CardService';
import { IPeople } from '../models/ISWAPI';

export function usePeope(
  searchTerm: string,
  currentPage: number,
  limit: number
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPeople[]>([]);

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

        setData(results);
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
  }, [searchTerm, currentPage, limit]);

  return [data, isLoading, totalResults.current] as const;
}
