import { searchTermLS } from '../models/constants';

export function getLocalStorage(): string {
  return localStorage.getItem(searchTermLS) || '';
}
