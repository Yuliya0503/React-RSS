import React from 'react';
import { ISearchPageState } from '../models/types';
import SearchInput from './SearchInput';
import SearchResult from './SearchResults';

export default class SearchPage extends React.Component<
  object,
  ISearchPageState
> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResult: [],
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') as string;
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
    this.performSearch(savedSearchTerm);
  }

  handleSearchInput = (searchTerm: string) => {
    this.setState({ searchTerm: searchTerm.trim() });
  };

  performSearch = (searchTerm: string) => {
    if (searchTerm) {
      localStorage.setItem('searchTerm', searchTerm);
    }
    this.setState({ searchResult: [] });
  };

  render(): React.ReactNode {
    return (
      <div>
        <SearchInput
          searchTerm={this.state.searchTerm}
          onSearch={this.performSearch}
          onSearchInputChange={this.handleSearchInput}
        />
        <SearchResult searchResult={this.state.searchResult} />
      </div>
    );
  }
}
