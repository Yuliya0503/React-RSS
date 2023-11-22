import styles from '../Details.module.css';
import { ICardPeopleProps } from '../../../models/types';

const DetailsInfo: React.FC<ICardPeopleProps> = ({ person }) => {
  const { name, gender, height, skin_color, hair_color, eye_color } = person;
  return (
    <>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.text}>Gender: {gender}</p>
      <p className={styles.text}>Height: {height}</p>
      <p className={styles.text}>Skin color: {skin_color}</p>
      <p className={styles.text}>Hair color: {hair_color}</p>
      <p className={styles.text}>Eye color: {eye_color}</p>
    </>
  );
};
export default DetailsInfo;
