import React from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from '../models/types';
import styles from '../App.module.css';
export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (error: Error): IErrorBoundaryState => {
    if (!error) {
      return { hasError: false };
    }
    return { hasError: true };
  };

  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo): void => {
    console.error('Caught an error:', error, errorInfo);
  };

  render = () => {
    if (this.state.hasError) {
      return (
        <div>
          <h2 className={styles.errorMess}>Something went wrong.</h2>
          <p className={styles.errorMess}>Sorry, an error occurred.</p>
        </div>
      );
    }
    return this.props.children;
  };
}
