import { IPlanet } from '../models/ISWAPI';

export default class PlanetService {
  static getPlanet = async (url: string): Promise<IPlanet> => {
    try {
      const response: Response = await fetch(url);
      if (response.status !== 200) {
        throw new Error(
          `Network request failed with status: ${response.status}`
        );
      }
      const data: IPlanet = await response.json();
      return data;
    } catch (error) {
      console.error(`Error while fetching data: ${error}`);
      throw error;
    }
  };
}
