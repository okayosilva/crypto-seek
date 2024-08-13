import { CoinProps } from './getDataCoin';

interface CoinDetails {
  data: CoinProps;
  error?: string;
}

export async function getDataCoinDetails(coin: string): Promise<CoinProps> {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
    const result: CoinDetails = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}
