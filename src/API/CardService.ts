import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ConstantsURL from './constants';
import { IPeople, IResponse } from '../models/ISWAPI';
const baseUrl = ConstantsURL.PEOPLE_URL;

export const apiPeople = createApi({
  reducerPath: 'apiPeople',
  tagTypes: ['People'],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query<IResponse, string>({
      query: (searchParams: string) => ({
        url: searchParams ? `?${searchParams}` : '',
      }),
      providesTags: ['People'],
    }),
    getPerson: builder.query<IPeople, string>({
      query: (id: string) => id,
    }),
  }),
});

export const selectPerson = (id: string) =>
  apiPeople.endpoints.getPeople.select(id);

export const { useGetPeopleQuery, useGetPersonQuery } = apiPeople;
