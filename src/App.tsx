import React from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import SearchResult from './components/SearchResults';
import { IPeople, IResponse } from './models/ISWAPI';
import PostService from './API/CardService';
import { AppState } from './models/types';
import { ErrorMessage, defaultSearch } from './models/constants';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      error: false,
    };
  }

  setCards = async (options?: string) => {
    try {
      const { results }: IResponse = await PostService.getPeople(options);
      this.setState({ cards: results, loading: false });
    } catch (error) {
      console.error(`Error: ${error}`);
      this.setState({ loading: false, error: true });
    }
  };

  updateCards = (newCards: IPeople[]) => this.setState({ cards: newCards });

  setLoading = (result: boolean) => this.setState({ loading: result });

  setError = (result: boolean) => this.setState({ error: result });

  componentDidMount(): void {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `search=${lastSearch}` : defaultSearch;
    this.setCards(searchParam);
  }

  renderLoading = () => {
    return <p>Loading...</p>;
  };

  renderError = () => {
    return <p>{ErrorMessage}</p>;
  };

  render() {
    const { loading, error, cards } = this.state;

    if (loading) {
      return this.renderLoading();
    }
    if (error) {
      return this.renderError();
    }

    return (
      <>
        <SearchResult
          updateCards={this.updateCards}
          setLoading={this.setLoading}
          setError={this.setError}
        />
        <SearchPage cards={cards} error={error} />
      </>
    );
  }
}
