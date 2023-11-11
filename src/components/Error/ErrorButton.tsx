import React from 'react';
import styles from './ErrorButton.module.css';
import { useState } from 'react';

const ErrorButton = () => {
  const [error, setError] = useState(false);
  const handleClick = () => setError(true);
  if (error) {
    throw new Error('Crashed!');
  }
  return (
    <div className={styles.btn_wrapper}>
      <button className={styles.errBtn} onClick={handleClick}>
        Oops! Error!
      </button>
    </div>
  );
};

export default ErrorButton;
