import { http, HttpResponse } from 'msw';
import { PeopleResponse } from '../data/peopleResponse';
import ConstantsURL from '../../API/constants';

export const handlers = [
  http.get(ConstantsURL.PEOPLE_URL, () => {
    return HttpResponse.json(PeopleResponse);
  }),

  http.get(`${ConstantsURL.PEOPLE_URL}1`, () => {
    return HttpResponse.json(PeopleResponse.results[0]);
  }),

  http.get(`${ConstantsURL.PEOPLE_URL}100`, () => {
    setTimeout(() => {
      return HttpResponse.json(PeopleResponse.results[0]);
    });
  }),

  http.get(`${ConstantsURL.PEOPLE_URL}NaN`, () => {
    return HttpResponse.error();
  }),
];
