import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ConstantsURL from './constants';
import { IPeople, IResponse } from '../models/ISWAPI';

const baseUrl = ConstantsURL.PEOPLE_URL;
const GET_PEOPLE_ENDPOINT = 'getPeople';
const GET_PERSON_ENDPOINT = 'getPerson';

export const apiPeople = createApi({
  reducerPath: 'apiPeople',
  tagTypes: ['People'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    [GET_PEOPLE_ENDPOINT]: builder.query<IResponse, string>({
      query: (searchParams: string) => ({
        url: searchParams ? `?${searchParams}` : '',
      }),
      providesTags: ['People'],
    }),
    [GET_PERSON_ENDPOINT]: builder.query<IPeople, string>({
      query: (id: string) => id,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = apiPeople;

export const selectPerson = (id: string) =>
  apiPeople.endpoints[GET_PERSON_ENDPOINT].select(id);
