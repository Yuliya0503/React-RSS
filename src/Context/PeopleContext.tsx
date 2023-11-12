import { createContext } from 'react';
import { IPeople } from '../models/ISWAPI';

export const PeopleContext = createContext<IPeople[]>([]);
