import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ConstantsURL from './constants';
const baseUrl = ConstantsURL.PEOPLE_URL;

export const apiPeople = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: (searchParams: string) => ({
        url: searchParams ? `?${searchParams}` : '',
      }),
    }),
    getPerson: builder.query({
      query: (id: string) => id,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = apiPeople;
