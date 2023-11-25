import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ConstantsURL from './constants';
import { IPeople, IResponse } from '../models/ISWAPI';
import { HYDRATE } from 'next-redux-wrapper';

const baseUrl = ConstantsURL.PEOPLE_URL;
const GET_PEOPLE_ENDPOINT = 'getPeople';
const GET_PERSON_ENDPOINT = 'getPerson';

export const apiPeople = createApi({
  reducerPath: 'apiPeople',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    [GET_PEOPLE_ENDPOINT]: builder.query<IResponse, string>({
      query: (searchParams: string) => ({
        url: searchParams ? `?${searchParams}` : '',
      }),
    }),
    [GET_PERSON_ENDPOINT]: builder.query<IPeople, string>({
      query: (id: string) => id,
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    return action.type === HYDRATE ? action.payload[reducerPath] : undefined;
  },
});

export const {
  useGetPeopleQuery,
  useGetPersonQuery,
  util: { getRunningQueriesThunk },
} = apiPeople;

export const { select: selectPerson } = apiPeople.endpoints.getPerson;

export const { getPeople, getPerson } = apiPeople.endpoints;
