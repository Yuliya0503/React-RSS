import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import NoResultSection from '../NoResultSection/NoResultSection';
import { useGetPersonQuery } from '../../API/CardService';
import useActions from '../../hooks/useActions';
import styles from './Details.module.css';
import DetailsInfo from './DetailsInfo/DetailsInfo';

const Details = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isFetching, isError } = useGetPersonQuery(id);
  const { loadingdetails } = useActions();

  useEffect(() => {
    loadingdetails(isFetching);
  }, [loadingdetails, isFetching]);

  const handleClick = (): void => {
    router.push('/');
  };

  return (
    <>
      {isFetching && <Loading />}
      {isError && <NotFound />}
      {!isFetching && !data && <NoResultSection />}
      {data && (
        <div className={styles.wrapper}>
          <DetailsInfo person={data} />
          <div className={styles.button_wrapper}>
            <button className={styles.button} onClick={handleClick}>
              Close
            </button>
          </div>
          <button className={styles.over} onClick={handleClick}></button>
        </div>
      )}
    </>
  );
};

export default Details;
