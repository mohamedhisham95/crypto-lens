// Actions
import { getCoinData } from '@/actions/';

// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { CoinAnalysisTemplate } from '@/components/coin-analysis';

export const metadata = getMetadata('coin_analysis');

export default async function CoinPage({
  params,
}: {
  params: { coin_id: string };
}) {
  const { coin_id } = await params;

  const coinData = await getCoinData(coin_id);

  return <CoinAnalysisTemplate coinId={coin_id} initialData={coinData} />;
}
