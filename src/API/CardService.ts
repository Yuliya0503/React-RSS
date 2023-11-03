import { IResponse } from '../models/ISWAPI';
import ConstantsURL from './constants';

const getPeople = async (opt?: string): Promise<IResponse> => {
  try {
    const url: string = opt
      ? `${ConstantsURL.PEOPLE_URL}?${opt}`
      : ConstantsURL.PEOPLE_URL;

    const response: Response = await fetch(url);

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
