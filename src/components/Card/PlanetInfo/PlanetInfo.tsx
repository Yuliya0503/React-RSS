import React from 'react';
import usePlanet from '../../../hooks/usePlanet';
import styles from './PlanetInfo.module.css';
interface IPlanetInfo {
  homeworld: string;
}

const PlanetInfo: React.FC<IPlanetInfo> = ({ homeworld }) => {
  const { planetName, loading, error } = usePlanet(homeworld);

  return (
    <p className={styles.wrapper}>
      Home World: {loading ? 'Loading' : error ? 'Oops!' : planetName}
    </p>
  );
};

export default PlanetInfo;
