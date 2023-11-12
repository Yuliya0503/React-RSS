import React from 'react';
import styles from './Loadiong.module.css';

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={styles.loading}>
      Loading...
    </div>
  );
};

export default Loading;
