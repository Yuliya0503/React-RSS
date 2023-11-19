import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './Details.module.css';
import NotFound from '../NotFound/NotFound';
import { useEffect } from 'react';
import { useGetPersonQuery } from '../../API/CardService';
import useActions from '../../hooks/useActions';
import NoResultSection from '../NoResultSection/NoResultSection';

const Details = () => {
  const { id } = useParams() as { id: string };
  const { data, isFetching, isError } = useGetPersonQuery(id);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loadingdetails } = useActions();

  useEffect(() => {
    loadingdetails(isFetching);
  }, [loadingdetails, isFetching]);

  const handleClick = (): void => {
    navigate(`/${search}`);
  };

  if (isFetching) return <Loading />;

  if (isError) return <NotFound />;
  if (!data) return <NoResultSection />;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{data.name}</h2>
      <p className={styles.text}>Gender: {data.gender}</p>
      <p className={styles.text}>Height: {data.height}</p>
      <p className={styles.text}>Skin color: {data.skin_color}</p>
      <p className={styles.text}>Hair color: {data.hair_color}</p>
      <p className={styles.text}>Eye color: {data.eye_color}</p>
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
