import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ConstantsURL from './constants';
import { IPeople, IResponse } from '../models/ISWAPI';
import { HYDRATE } from 'next-redux-wrapper';

const baseUrl = ConstantsURL.PEOPLE_URL;

export const apiPeople = createApi({
  reducerPath: 'apiPeople',
  tagTypes: ['People'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query<IResponse, string>({
      query: (searchParams) => `?${searchParams}`,
      providesTags: ['People'],
    }),
    getPerson: builder.query<IPeople, string>({
      query: (id) => `/${id}`,
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    return action.type === HYDRATE ? action.payload[reducerPath] : undefined;
  },
});

export const {
  util: { getRunningQueriesThunk },
} = apiPeople;

export const { getPeople, getPerson } = apiPeople.endpoints;
