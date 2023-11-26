import { ParsedUrlQuery, encode } from 'querystring';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../models/constants';

export const getSearchParams = (query: ParsedUrlQuery) => {
  const searchParams = new URLSearchParams(encode(query));

  return {
    limit: Number(searchParams.get('limit')) || DEFAULT_LIMIT,
    page: Number(searchParams.get('page')) || DEFAULT_PAGE,
    search: searchParams.get('search') || '',
  };
};
