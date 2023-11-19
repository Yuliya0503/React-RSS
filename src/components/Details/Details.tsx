import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './Details.module.css';
import NotFound from '../NotFound/NotFound';
import { useAppDispatch } from '../../hooks/reduxHoooks';
import { useEffect } from 'react';
import { useGetPersonQuery } from '../../API/CardService';
import { loadingdetails } from '../../Store/Reducers/loadingReduser';

const Details = (): JSX.Element | null => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useGetPersonQuery(id);
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadingdetails(isLoading));
  }, [dispatch, isLoading]);

  const handleClick = (): void => {
    navigate(`/${search}`);
  };

  if (isLoading) return <Loading />;

  if (error) return <NotFound />;

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
