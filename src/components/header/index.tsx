import { Link } from 'react-router-dom';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <Link to={'/'}>
        <h1 className={styles.title}>
          Crypto <span className={styles.emphasis}>Seek</span>
        </h1>
      </Link>
    </header>
  );
}
