import { IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

const getPeople = async (
  page?: string | number,
  secrch?: string
): Promise<IResponse> => {
  try {
    const serches = secrch
      ? `${ConstantsURL.PEOPLE_URL}?${secrch}&`
      : `${ConstantsURL.PEOPLE_URL}?`;
    const url = `${serches}page=${page}`;
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
