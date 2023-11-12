import { useContext } from 'react';
import { PeopleContext } from '../Context/PeopleContext';

export const usePeopleContext = () => {
  return useContext(PeopleContext);
};
