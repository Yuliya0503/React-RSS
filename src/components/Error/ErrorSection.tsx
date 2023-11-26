import React from 'react';
import { ErrorMessage } from '../../models/constants';
import styles from './ErrorSection.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ErrorSection: React.FC = () => (
  <ErrorBoundary>
    <p className={styles.errorMess}>{ErrorMessage}</p>
  </ErrorBoundary>
);

export default ErrorSection;
