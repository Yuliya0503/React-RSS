import { useEffect, useState } from 'react';
import getPlanet from '../API/PlanetService';

const usePlanet = (homeworld: string) => {
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

  return { planetName, loading, error };
};

export default usePlanet;
