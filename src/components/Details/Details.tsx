import { useNavigate, useParams } from 'react-router-dom';
import { usePerson } from '../../hooks/usePerson';
import Loading from '../Loading/Loading';
import ErrorSection from '../Error/ErrorSection';

const Details = (): JSX.Element | null => {
  const { id } = useParams() as { id: string };
  const [person, error, isLoading] = usePerson(+id);
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/');
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorSection />;

  if (!person) return null;

  return (
    <div>
      <h2>Person Details - {person.name}</h2>
      <p>Name: {person.name}</p>
      <p>Gender: {person.gender}</p>
      <p>Height: {person.height}</p>
      <p>Skin color: {person.skin_color}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Eye color: {person.eye_color}</p>
      <div>
        <button onClick={handleClick}>Close</button>
      </div>
      <button onClick={handleClick}></button>
    </div>
  );
};

export default Details;
