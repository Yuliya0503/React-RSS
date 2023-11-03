import React from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from '../../models/types';
import styles from '../../App.module.css';
import { ErrorMessage } from '../../models/constants';
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

  render = (): React.ReactNode => {
    if (this.state.hasError) {
      return (
        <div>
          <h2 className={styles.errorMess}>{ErrorMessage}</h2>
        </div>
      );
    }
    return this.props.children;
  };
}
