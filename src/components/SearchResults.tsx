import React from 'react';
import { ISearchResultsProps } from '../types/types';

export default class SearchResult extends React.Component<ISearchResultsProps> {
  render() {
    const { searchResult } = this.props;
    return (
      <div>
        <ul>
          {searchResult.map((result, index) => (
            <li key={index}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
