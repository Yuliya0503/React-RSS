import { useEffect, useState } from 'react';
import { getPerson } from '../API/CardService';
import { IPeople } from '../models/ISWAPI';

export function usePerson(id: number) {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [person, setPerson] = useState<IPeople>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchPerson = async (id: number) => {
      setIsLoading(true);
      setError('');
      try {
        const personData: IPeople = await getPerson(id, { signal });
        setPerson(personData);
        setIsLoading(false);
      } catch (e) {
        const error: Error = e as Error;
        if (error.name !== 'AbortError') {
          setError('Some Error in usePerson');
          setIsLoading(false);
        }
      }
    };
    fetchPerson(id);

    return () => abortController.abort();
  }, [id]);

  return [person, error, isLoading] as const;
}
