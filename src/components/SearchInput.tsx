import React from 'react';
import { IResponse } from '../models/ISWAPI';
import PostService from '../API/CardService';
import { ISearchState, ISearchInputProps } from '../models/types';
import { defaultSearch } from '../models/constants';
import styles from './SearchInput.module.css';
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
    const endPoint = searchTerm ? `?search=${searchTerm}` : defaultSearch;
    localStorage.setItem('lastSearch', searchTerm);
    try {
      setLoading(true);
      const { results }: IResponse = await PostService.getPeople(endPoint);
      updateCards(results);
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
      <form className={styles.form} onSubmit={this.handleSearch}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={this.handleInputChange}
        />
        <button className={styles.input_btn} type="submit">
          Search
        </button>
      </form>
    );
  }
}
