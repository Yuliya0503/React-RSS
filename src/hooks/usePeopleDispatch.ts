import { useContext } from 'react';
import { PeopleDispatchContext } from '../Context/PeopleContext';

export function usePeopleDispatch() {
  const setPeople = useContext(PeopleDispatchContext);
  if (!setPeople) {
    throw new Error('usePeopleDispatch must be used within a PeopleProvider');
  }
  return setPeople;
}
