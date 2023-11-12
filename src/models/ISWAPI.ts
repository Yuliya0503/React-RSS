export interface IPeople {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface IPlanet {
  name: string;
}

export interface IResponse {
  count: number;
  next: string | string;
  previous: string | null;
  results: IPeople[];
}
