import React from 'react';
import { NoResultMessage } from '../../models/constants';
import styles from './NoResultSection.module.css';

const NoResultSection: React.FC = () => (
  <p className={styles.mess}>{NoResultMessage}</p>
);

export default NoResultSection;
