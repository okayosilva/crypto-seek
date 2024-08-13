import { formatNumber } from '../utils/formatNumber';

export interface CoinProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  formatePrice?: string;
  formateMarket?: string;
  formateVolume?: string;
}

export interface DataProps {
  data: CoinProps[];
}

export async function getDataCoin(offset: number): Promise<CoinProps[]> {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets?limit=5&offset=${offset}`,
    );
    const result: DataProps = await response.json();

    return result.data.map((item: CoinProps) => {
      return {
        ...item,
        formatePrice: formatNumber(item.priceUsd),
        formateMarket: formatNumber(item.marketCapUsd, true),
        formateVolume: formatNumber(item.volumeUsd24Hr, true),
      };
    });
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
}
