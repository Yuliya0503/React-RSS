import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { IPeople } from '../models/ISWAPI';
interface PeopleProviderProps {
  children: ReactNode;
}

export const PeopleContext = createContext<IPeople[]>([]);

export const PeopleDispatchContext = createContext<Dispatch<
  SetStateAction<IPeople[]>
> | null>(null);

export default function PeopleProvider({ children }: PeopleProviderProps) {
  const [people, setPeople] = useState<IPeople[]>([]);

  return (
    <PeopleContext.Provider value={people}>
      <PeopleDispatchContext.Provider value={setPeople}>
        {children}
      </PeopleDispatchContext.Provider>
    </PeopleContext.Provider>
  );
}
