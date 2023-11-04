import { IPeople, IResponse } from '../models/ISWAPI';
import getPeople from '../API/CardService';
import { defaultSearch } from '../models/constants';

const fetchData = async (
  setCards: (cards: IPeople[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: boolean) => void,
  setErrorMessage: (errorMessage: string) => void
) => {
  try {
    setLoading(true);
    setError(false);
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `search=${lastSearch}` : defaultSearch;
    const { results }: IResponse = await getPeople(searchParam);
    setCards(results);
    setLoading(false);
  } catch (error) {
    console.error(`Error: ${error}`);
    setErrorMessage(error instanceof Error ? error.message : '');
    setLoading(false);
    setError(true);
  }
};

export default fetchData;
