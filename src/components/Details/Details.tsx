import { useRouter } from 'next/router';
import styles from './Details.module.css';
import DetailsInfo from './DetailsInfo/DetailsInfo';
import { IPeople } from '@/src/models/ISWAPI';

interface DetailsProps {
  person: IPeople;
}

const Details = ({ person }: DetailsProps): JSX.Element => {
  const router = useRouter();
  const handleClick = (): void => {
    router.back();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <DetailsInfo person={person} />
        <div className={styles.button_wrapper}>
          <button className={styles.button} onClick={handleClick}>
            Close
          </button>
        </div>
        <button className={styles.over} onClick={handleClick}></button>
      </div>
    </>
  );
};

export default Details;
