import React from 'react';
import styles from './App.module.css';
import SearchPage from './components/SearchPage';
import SearchResult from './components/SearchResults';
import { IPeople, IResponse } from './models/ISWAPI';
import { AppState } from './models/types';
import { ErrorMessage, defaultSearch } from './models/constants';
import ErrorBoundary from './components/ErrorBoundary';
import getPeople from './API/CardService';

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
      const { results }: IResponse = await getPeople(options);
      this.setState({ cards: results, loading: false });
    } catch (error) {
      console.error(`Error: ${error}`);
      this.setState({ loading: false, error: true });
    }
  };

  updateCards = (newCards: IPeople[]) => this.setState({ cards: newCards });

  setLoading = (result: boolean) => this.setState({ loading: result });

  setError = (result: boolean) => this.setState({ error: result });

  componentDidMount = (): void => {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchParam = lastSearch ? `search=${lastSearch}` : defaultSearch;
    this.setCards(searchParam);
  };

  generateError = () => {
    try {
      throw new Error('Oops! Error!');
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        this.setState({ error: true, errorMessage: error.message });
        console.error(error.message);
      } else {
        this.setState({ error: true });
      }
    }
  };

  renderLoading = () => {
    return <p className={styles.loading}>Loading...</p>;
  };

  renderError = () => {
    return (
      <ErrorBoundary errorMessage={this.state.errorMessage}>
        <p className={styles.errorMess}>{ErrorMessage}</p>
      </ErrorBoundary>
    );
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
      <ErrorBoundary>
        <div className={styles.root}>
          <button className={styles.errBtn} onClick={this.generateError}>
            Oops! Error!
          </button>
          <SearchResult
            updateCards={this.updateCards}
            setLoading={this.setLoading}
            setError={this.setError}
          />
          <SearchPage cards={cards} error={error} />
        </div>
      </ErrorBoundary>
    );
  }
}
