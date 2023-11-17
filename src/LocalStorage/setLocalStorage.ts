import { searchTermLS } from '../models/constants';

export function setLocalStorage(search: string): void {
  return localStorage.setItem(searchTermLS, search);
}
