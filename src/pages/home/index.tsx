import { Search, TrendingUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export function Home() {
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  return (
    <main className={styles.mainContainer}>
      <form
        className={`${styles.formContainer} ${isActive ? styles.active : ''}`}
        onClick={() => setIsActive(true)}
        ref={formRef}
      >
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

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-Label="Moeda">
              <div className={styles.name}>
                <Link to={'/details/bitcoin'}>
                  <span>Bitcoin | BTC</span>
                </Link>
              </div>
            </td>

            <td className={styles.tdLabel} data-Label="Valor mercado">
              1T
            </td>
            <td className={styles.tdLabel} data-Label="Preço">
              8.000
            </td>
            <td className={styles.tdLabel} data-Label="Volume">
              2B
            </td>
            <td className={styles.tdProfit} data-Label="Mudança 24h">
              <div className={styles.change}>
                <span>1.20</span>
                <TrendingUp />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
