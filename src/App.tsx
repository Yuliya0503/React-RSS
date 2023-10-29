import React from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import SearchResult from './components/SearchResults';
import { IPeople, IResponse } from './models/ISWAPI';
import PostService from './API/CardService';

interface AppState {
  cards: IPeople[];
  loading: boolean;
  error: boolean;
  errorMessage?: string;
}

const initialState: AppState = {
  cards: [],
  loading: true,
  error: false,
};

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = initialState;
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
    const defaultSearch = '?page=1';
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `search=${lastSearch}` : defaultSearch;
    this.setCards(searchParam);
  }

  render() {
    const { loading, error, cards } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>error data, reload page</p>;
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
