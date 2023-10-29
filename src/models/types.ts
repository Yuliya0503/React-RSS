import { IPeople } from './ISWAPI';

export interface ICardPeopleProps {
  person: IPeople;
}

export interface ISearchState {
  searchTerm: string;
}

export interface ISearchInputProps {
  updateCards: (newCards: IPeople[]) => void;
  setLoading: (result: boolean) => void;
  setError: (result: boolean) => void;
}

export interface ISearchPageProps {
  cards: IPeople[];
  error: boolean;
}

export interface AppState {
  cards: IPeople[];
  loading: boolean;
  error: boolean;
  errorMessage?: string;
}
