import { useRouter } from 'next/router';
// import Loading from '../Loading/Loading';
// import NotFound from '../NotFound/NotFound';
// import NoResultSection from '../NoResultSection/NoResultSection';
// import { useGetPersonQuery } from '../../API/CardService';
import styles from './Details.module.css';
import DetailsInfo from './DetailsInfo/DetailsInfo';
import { encode } from 'querystring';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/src/models/constants';
import { IPeople } from '@/src/models/ISWAPI';

interface DetailsProps {
  person: IPeople;
}

const Details = ({ person }: DetailsProps): JSX.Element => {
  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));
  const limit: number = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
  const currentPage: number = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const search: string = searchParams.get('search') || '';
  const commonQuery = { pathname: '/', query: { search, currentPage, limit } };

  const handleClick = (): void => {
    router.push(commonQuery);
  };

  return (
    <>
      {/* {isFetching && <Loading />}
      {isError && <NotFound />}
      {!isFetching && !data && <NoResultSection />} */}
      {person && (
        <div className={styles.wrapper}>
          <DetailsInfo person={person} />
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
