import { useNavigate, useParams } from 'react-router-dom';
import { usePerson } from '../../hooks/usePerson';
import Loading from '../Loading/Loading';
import ErrorSection from '../Error/ErrorSection';
import styles from './Details.module.css';

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
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{person.name}</h2>
      <p className={styles.text}>Gender: {person.gender}</p>
      <p className={styles.text}>Height: {person.height}</p>
      <p className={styles.text}>Skin color: {person.skin_color}</p>
      <p className={styles.text}>Hair color: {person.hair_color}</p>
      <p className={styles.text}>Eye color: {person.eye_color}</p>
      <div className={styles.button_wrapper}>
        <button className={styles.button} onClick={handleClick}>
          Close
        </button>
      </div>
      <button className={styles.over} onClick={handleClick}></button>
    </div>
  );
};

export default Details;
