import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICardPeopleProps } from '../models/types';
import styles from './cardPeople.module.css';
import PlanetService from '../API/PlanetService';

const CardPeople: React.FC<ICardPeopleProps> = ({ person }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [planetName, setPlanetName] = useState('');
  const abortControllerRef = useRef(new AbortController());

  const setPlanet = useCallback(async (url: string): Promise<void> => {
    try {
      const planetInfo = await PlanetService.getPlanet(url);
      setPlanetName(planetInfo.name);
      setLoading(false);
    } catch (error: Error | unknown) {
      console.error('Oops!', error);
      setLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    const abortController = abortControllerRef.current;
    setPlanet(person.homeworld);
    return () => {
      abortController.abort();
    };
  }, [person.homeworld, setPlanet]);

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
      <p>Home World: {loading ? 'Loading' : error ? 'Oops!' : planetName}</p>
    </div>
  );
};

export default CardPeople;
