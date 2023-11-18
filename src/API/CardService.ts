// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import ConstantsURL from './constants';
// const baseUrl = ConstantsURL.PEOPLE_URL;

// export const apiPeople = createApi({
//   reducerPath: 'peopleApi',
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//   endpoints: (builder) => ({
//     getPeople: builder.query({
//       query: (searchParams: string) => ({
//         url: searchParams ? `?${searchParams}` : '',
//       }),
//     }),
//     getPerson: builder.query({
//       query: (id: string) => id,
//     }),
//   }),
// });

// export const { useGetPeopleQuery, useGetPersonQuery } = apiPeople;

import { IPeople, IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

const baseUrl = ConstantsURL.PEOPLE_URL;

export const getPeople = async (
  page: number,
  search: string,
  limit: number,
  options: RequestInit = {}
): Promise<IResponse> => {
  try {
    const searchParams = new URLSearchParams();
    search && searchParams.append('search', search);
    page && searchParams.append('page', page.toString());
    limit && searchParams.append('limit', limit.toString());
    const url = baseUrl + '?' + searchParams;
    const response: Response = await fetch(url, options);

    console.log(url);

    if (!response.ok) {
      throw new Error(`Network request failed with status: ${response.status}`);
    }
    const data: IResponse = await response.json();
    return data;
  } catch (error: Error | unknown) {
    console.error(`Error while fetching data: ${error}`);
    throw error;
  }
};
export const getPerson = async (
  id: number,
  options: RequestInit = {}
): Promise<IPeople> => {
  const response = await fetch(baseUrl + id, options);
  if (!response.ok) {
    throw new Error(`Network request failed with status: ${response.status}`);
  }
  return response.json();
};
