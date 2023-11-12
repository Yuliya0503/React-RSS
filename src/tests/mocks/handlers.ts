import { http, HttpResponse } from 'msw';
import { PeopleResponse } from '../data/peopleResponse';

export const handlers = [
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json(PeopleResponse);
  }),

  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(PeopleResponse.results[0]);
  }),

  http.get('https://swapi.dev/api/people/100', () => {
    setTimeout(() => {
      return HttpResponse.json(PeopleResponse.results[0]);
    });
  }),

  http.get('https://swapi.dev/api/people/NaN', () => {
    return HttpResponse.error();
  }),
];
