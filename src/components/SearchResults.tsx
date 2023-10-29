import React from 'react';
import SearchInput from './SearchInput';
import { ISearchInputProps } from '../models/types';

export default class SearchResult extends React.Component<ISearchInputProps> {
  render() {
    return (
      <header>
        <h1>Star Wars</h1>
        <SearchInput {...this.props} />
      </header>
    );
  }
}
