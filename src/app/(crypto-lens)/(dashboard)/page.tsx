// Actions
import {
  getTopGainersLosers,
  getGlobalData,
  getTrendingCoins,
} from '@/actions';

// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { AlertMessage } from '@/components/common';
import {
  MarketCapAndVolume,
  TopGainersLosersTemplate,
} from '@/components/dashboard';

export const metadata = getMetadata('dashboard');

export default async function DashboardPage() {
  const [globalData, topGainersLosersData, trendingCoinsData] =
    await Promise.all([
      getGlobalData(),
      getTopGainersLosers(),
      getTrendingCoins(),
    ]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {!globalData?.success ? (
        <AlertMessage message={globalData?.message} />
      ) : (
        <MarketCapAndVolume initialData={globalData} />
      )}

      {!topGainersLosersData?.success ? (
        <AlertMessage message={topGainersLosersData?.message} />
      ) : (
        <TopGainersLosersTemplate initialData={topGainersLosersData} />
      )}
    </div>
  );
}
