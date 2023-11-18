import { DEFAULT_PAGE } from '../../models/constants';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const handleButtonClick = () => {
    setPage(DEFAULT_PAGE);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title_wrapper}>
        <h1 className={styles.title} onClick={handleButtonClick}>
          Star Wars
        </h1>
      </Link>
      <SearchInput setPage={setPage} />
    </header>
  );
};

export default Header;
