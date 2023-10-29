import React from 'react';
//import { ISearchInputProps } from '../models/types';
import { IPeople, IResponse } from '../models/ISWAPI';
import PostService from '../API/CardService';
interface ISearchState {
  searchTerm: string;
}

interface ISearchInputProps {
  updateCards: (newCards: IPeople[]) => void;
  setLoading: (result: boolean) => void;
  setError: (result: boolean) => void;
}

export default class SearchInput extends React.Component<
  ISearchInputProps,
  ISearchState
> {
  constructor(props: ISearchInputProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  handleSearch = async (event: React.FormEvent) => {
    const { updateCards, setLoading, setError } = this.props;
    event.preventDefault();
    const { searchTerm } = this.state;
    console.log(`Поисковый запрос: ${searchTerm}`);
    const endPoint = searchTerm ? `?search=${searchTerm}` : '?page=1';
    console.log(endPoint);
    localStorage.setItem('lastSearch', searchTerm);
    try {
      setLoading(true);
      const { results }: IResponse = await PostService.getPeople(endPoint);
      console.log(results);
      updateCards(results);
      console.log('ok');
      setLoading(false);
    } catch (error) {
      console.error(`Error: ${error}`);
      setLoading(false);
      setError(true);
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={this.handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
