import { Search, X } from 'lucide-react';
import styles from './home.module.css';

export function Home() {
  return (
    <main className={styles.mainContainer}>
      <form className={styles.formContainer}>
        <button type="submit" className={styles.buttonForm}>
          <Search />
        </button>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          className={styles.inputForm}
        />
        <button type="submit" className={styles.buttonFormeDelete}>
          <X />
        </button>
      </form>
    </main>
  );
}
