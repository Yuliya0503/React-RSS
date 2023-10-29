import React from 'react';
import { IPeople } from '../models/ISWAPI';
import SearchInput from './SearchInput';
interface ISearchResultProps {
  updateCards: (newCards: IPeople[]) => void;
  setLoading: (result: boolean) => void;
  setError: (result: boolean) => void;
}
export default class SearchResult extends React.Component<ISearchResultProps> {
  constructor(props: ISearchResultProps) {
    super(props);
  }
  render() {
    return (
      <header>
        <h1>Star Wars</h1>
        <SearchInput {...this.props} />
      </header>
    );
  }
}
