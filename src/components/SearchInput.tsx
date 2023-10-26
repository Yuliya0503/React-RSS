import React from 'react';
import { ISearchInputProps } from '../models/types';

export default class SearchInput extends React.Component<ISearchInputProps> {
  render(): React.ReactNode {
    const { searchTerm, onSearch, onSearchInputChange } = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSearchInputChange(event.target.value)
          }
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </div>
    );
  }
}
