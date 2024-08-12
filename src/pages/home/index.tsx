import { Search, TrendingDown, TrendingUp, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoinProps, getDataCoin } from '../../api/getDataCoin';
import styles from './home.module.css';

export function Home() {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [coins, setCoins] = useState<CoinProps[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (inputValue === '') return;

    navigate(`/details/${inputValue}`);
  }

  function handleLoadMore() {}

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

  useEffect(() => {
    getDataCoin()
      .then((data) => setCoins(data))
      .catch((error) => console.error('Error setting coin data:', error));
  }, []);

  return (
    <main className={styles.mainContainer}>
      <form
        className={`${styles.formContainer} ${isActive ? styles.active : ''}`}
        onClick={() => setIsActive(true)}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <button type="submit" className={styles.buttonForm} name="submitSearch">
          <Search />
        </button>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          className={styles.inputForm}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        {isActive && (
          <button type="submit" className={styles.buttonFormeDelete}>
            <X />
          </button>
        )}
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
          {coins.length > 0 &&
            coins.map((coin) => (
              <tr className={styles.tr} key={coin.id}>
                <td className={styles.tdLabel} data-Label="Moeda">
                  <div className={styles.name}>
                    <Link to={`/details/${coin.id}`}>
                      <span>
                        {coin.name} | {coin.symbol}
                      </span>
                    </Link>
                  </div>
                </td>

                <td className={styles.tdLabel} data-Label="Valor mercado">
                  {coin.formateMarket}
                </td>
                <td className={styles.tdLabel} data-Label="Preço">
                  {coin.formatePrice}
                </td>
                <td className={styles.tdLabel} data-Label="Volume">
                  {coin.formateVolume}
                </td>
                <td
                  className={
                    Number(coin.changePercent24Hr) > 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-Label="Mudança 24h"
                >
                  <div className={styles.change}>
                    <span>{coin.changePercent24Hr}</span>
                    {Number(coin.changePercent24Hr) > 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className={styles.containerButtonLoad}>
        <button className={styles.buttonLoad} onClick={handleLoadMore}>
          Ver mais
        </button>
      </div>
    </main>
  );
}
