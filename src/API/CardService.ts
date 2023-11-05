import { IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

const getPeople = async (
  page?: string | number,
  search?: string
): Promise<IResponse> => {
  try {
    const baseUrl = ConstantsURL.PEOPLE_URL;
    const searchParam = search ? `search=${search}` : '';
    const pageParam = search ? '' : `page=${page || 1}`;
    const query = [searchParam, pageParam].filter(Boolean).join('&');
    const url = `${baseUrl}${query ? `?${query}` : ''}`;
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    });
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
export default getPeople;
