import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './LinkWithQueryParams.module.css';

interface LinkWithQueryParamsProps {
  children: React.ReactNode;
  to: string;
}

const LinkWithQueryParams: React.FC<LinkWithQueryParamsProps> = ({
  children,
  to,
}: LinkWithQueryParamsProps) => {
  const router = useRouter();
  const { query } = router;

  const queryParams = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const toWithQueryParams =
    to + (queryParams.toString() ? `?${queryParams.toString()}` : '');

  return (
    <Link href={toWithQueryParams}>
      <a className={styles.links}>{children}</a>
    </Link>
  );
};

export default LinkWithQueryParams;
