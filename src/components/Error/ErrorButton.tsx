import React from 'react';
import styles from './ErrorButton.module.css';
import generateError from '../../helpers/generateError';

interface ErrorButtonProps {
  setError: (error: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

const ErrorButton: React.FC<ErrorButtonProps> = ({
  setError,
  setErrorMessage,
}) => {
  return (
    <button
      className={styles.errBtn}
      onClick={() => generateError(setError, setErrorMessage)}
    >
      Oops! Error!
    </button>
  );
};

export default ErrorButton;
