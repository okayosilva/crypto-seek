import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CoinProps } from '../../api/getDataCoin';
import { getDataCoinDetails } from '../../api/getDataCoinDetails';
import { formatNumber } from '../../utils/formatNumber';

import { SkeletonDetails } from '../../components/skeletonDetails';
import styles from './details.module.css';

export function Details() {
  const { crypto } = useParams();
  const [onLoading, setOnLoading] = useState(false);
  const [coinDetails, setCoinDetails] = useState<CoinProps>();

  const navigate = useNavigate();

  useEffect(() => {
    setOnLoading(true);

    getDataCoinDetails(crypto as string)
      .then((data) => {
        if ('error' in data) {
          navigate('/');
          return;
        }

        const coinDataFormat = {
          ...data,
          formatePrice: formatNumber(data.priceUsd),
          formateMarket: formatNumber(data.marketCapUsd, true),
          formateVolume: formatNumber(data.volumeUsd24Hr, true),
        };

        setCoinDetails(coinDataFormat);
      })
      .catch((error) => {
        console.error('Error setting coin details:', error);
        navigate('/');
      })
      .finally(() => {
        setOnLoading(false);
      });
  }, [crypto]);
  return (
    <div className={styles.container}>
      {onLoading ? (
        <SkeletonDetails />
      ) : (
        <section className={styles.cardDetails}>
          <div className={styles.cardLogo}>
            <img
              className={styles.logo}
              src={`https://assets.coincap.io/assets/icons/${coinDetails?.symbol.toLowerCase()}@2x.png`}
              alt="Logo da moeda"
            />

            <h1 className={styles.titleDetails}>
              {coinDetails?.name} | {coinDetails?.symbol}
            </h1>
          </div>

          <div className={styles.containerItemsDetails}>
            <div className={styles.contentDetails}>
              <div className={styles.contentItems}>
                <strong className={styles.descriptionDetails}>Preço</strong>
                <span>{coinDetails?.formatePrice}</span>
              </div>

              <div className={styles.contentItems}>
                <strong className={styles.descriptionDetails}>Mercado</strong>
                <span>{coinDetails?.formateMarket}</span>
              </div>
            </div>

            <div className={styles.contentDetails}>
              <div className={styles.contentItems}>
                <strong className={styles.descriptionDetails}>Volume</strong>
                <span>{coinDetails?.formateVolume}</span>
              </div>

              <div
                className={`
              ${styles.contentItemsChange}
              ${Number(coinDetails?.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}
            `}
              >
                <span>{Number(coinDetails?.changePercent24Hr).toFixed(3)}</span>
                {Number(coinDetails?.changePercent24Hr) > 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
