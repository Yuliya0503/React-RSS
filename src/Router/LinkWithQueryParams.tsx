import React from 'react';
import { useLocation, Link, LinkProps } from 'react-router-dom';
import styles from './LinkWithQueryParams.module.css';

interface LinkWithQueryParamsProps extends LinkProps {
  to: string;
}

const LinkWithQueryParams: React.FC<LinkWithQueryParamsProps> = ({
  children,
  to,
  ...props
}: LinkWithQueryParamsProps) => {
  const { search } = useLocation();
  const toWithPath = to && to.trim() !== '' ? to + search : to;
  return (
    <Link to={toWithPath} {...props} className={styles.links}>
      {children}
    </Link>
  );
};
export default LinkWithQueryParams;
