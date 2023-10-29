import React from 'react';
import SearchInput from './SearchInput';
import { ISearchInputProps } from '../models/types';
import styles from './SearchResults.module.css';

export default class SearchResult extends React.Component<ISearchInputProps> {
  render() {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>Star Wars</h1>
        <SearchInput {...this.props} />
      </header>
    );
  }
}
