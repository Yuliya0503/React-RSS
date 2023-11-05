import { IPeople, IPlanet } from './ISWAPI';
import React, { Dispatch, SetStateAction } from 'react';

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
  countPages: number;
  setCards: Dispatch<SetStateAction<IPeople[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AppState {
  cards: IPeople[];
  loading: boolean;
  error: boolean;
  errorMessage?: string;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: string;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface ICardPeopleState {
  planet: IPlanet;
  loading: boolean;
  error: boolean;
}
