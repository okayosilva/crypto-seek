import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        Crypto <span className={styles.emphasis}>Seek</span>
      </h1>
    </header>
  );
}
