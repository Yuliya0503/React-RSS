import { IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

export default class PostService {
  static async getPeople(opt?: string): Promise<IResponse> {
    try {
      const url: string = opt
        ? ConstantsURL.PEOPLE_URL + opt
        : ConstantsURL.PEOPLE_URL;
      const response: Response = await fetch(url);
      if (response.status !== 200) {
        throw new Error(
          `Network request failed with status: ${response.status}`
        );
      }
      const data: IResponse = await response.json();
      return data;
    } catch (error) {
      console.error(`Error while fetching data: ${error}`);
      throw error;
    }
  }
}
