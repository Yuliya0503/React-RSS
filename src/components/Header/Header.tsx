import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onClick: (searchTerm: string) => void;
  searchTerm: string;
}

const Header = ({ onClick, searchTerm }: HeaderProps) => {
  const handleButtonClick = () => {
    onClick('');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title_wrapper}>
        <h1 className={styles.title} onClick={handleButtonClick}>
          Star Wars
        </h1>
      </Link>
      <SearchInput onClick={onClick} searchTerm={searchTerm} />
    </header>
  );
};

export default Header;
