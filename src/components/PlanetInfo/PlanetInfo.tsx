import React, { useEffect, useState } from 'react';
import getPlanet from '../../API/PlanetService';

interface IPlanetInfo {
  homeworld: string;
}

const PlanetInfo: React.FC<IPlanetInfo> = ({ homeworld }) => {
  const [planetName, setPlanetName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const planetInfo = await getPlanet(homeworld);
        setPlanetName(planetInfo.name);
      } catch (error) {
        console.error('Oops!', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanet();
  }, [homeworld]);

  return (
    <p>Home World: {loading ? 'Loading' : error ? 'Oops!' : planetName}</p>
  );
};

export default PlanetInfo;
