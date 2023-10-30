import React from 'react';
import { ICardPeopleProps, ICardPeopleState } from '../models/types';
import styles from './cardPeople.module.css';
import PlanetService from '../API/PlanetService';
import { IPlanet } from '../models/ISWAPI';

export default class CardPeople extends React.Component<
  ICardPeopleProps,
  ICardPeopleState
> {
  constructor(props: ICardPeopleProps) {
    super(props);
    this.state = {
      planet: {
        name: '',
      },
      loading: true,
      error: false,
    };
  }

  setPlanet = async (url: string): Promise<void> => {
    try {
      const planetInfo: IPlanet = await PlanetService.getPlanet(url);
      this.setState({
        planet: planetInfo,
        loading: false,
      });
    } catch (error: Error | unknown) {
      console.error('Oops!', error);
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount = (): void => {
    this.setPlanet(this.props.person.homeworld);
  };

  render = (): JSX.Element => {
    const { person } = this.props;
    const planet: IPlanet = this.state.planet;
    return (
      <div className={styles.people_card}>
        <h2>{person.name}</h2>
        <p>Gender: {person.gender}</p>
        <p>Birth Year: {person.birth_year}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <p>Height: {person.height} cm</p>
        <p>Mass: {person.mass} kg</p>
        <p>
          Home World:{' '}
          {this.state.loading
            ? 'Loading'
            : this.state.error
            ? 'Oops!'
            : planet.name}
        </p>
      </div>
    );
  };
}
