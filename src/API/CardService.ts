import { IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

export default async function getPeopole(options?: string): Promise<IResponse> {
  try {
    const response = await fetch(
      options ? ConstantsURL.PEOPLE_URL + options : ConstantsURL.PEOPLE_URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`Network request failed with status: ${response.status}`);
    }
    const data: IResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error while fetching data: ${error}`);
    throw error;
  }
}
