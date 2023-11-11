import React from 'react';
import usePlanet from '../../../hooks/usePlanet';

interface IPlanetInfo {
  homeworld: string;
}

const PlanetInfo: React.FC<IPlanetInfo> = ({ homeworld }) => {
  const { planetName, loading, error } = usePlanet(homeworld);

  return (
    <p>Home World: {loading ? 'Loading' : error ? 'Oops!' : planetName}</p>
  );
};

export default PlanetInfo;
