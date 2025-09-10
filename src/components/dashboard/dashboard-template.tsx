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
  MarketCap,
  Volume,
  TopGainersLosers,
  TrendingCoins,
} from '@/components/dashboard';

export const metadata = getMetadata('dashboard');

export default async function DashboardPage() {
  const globalData = await getGlobalData();
  const topGainersLosersData = await getTopGainersLosers();
  const trendingCoinsData = await getTrendingCoins();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {!globalData?.success ? (
        <AlertMessage message={globalData?.message} />
      ) : (
        <MarketCap
          totalMarketCap={globalData?.global_data?.total_market_cap}
          chgPercentage24h={
            globalData?.global_data?.market_cap_change_percentage_24h_usd
          }
        />
      )}

      {!globalData?.success ? (
        <AlertMessage message={globalData?.message} />
      ) : (
        <Volume totalVolume={globalData?.global_data?.total_volume} />
      )}

      {!topGainersLosersData?.success ? (
        <AlertMessage message={topGainersLosersData?.message} />
      ) : (
        <TopGainersLosers
          title="🚀 Top Gainers"
          data={topGainersLosersData?.top_gainers}
        />
      )}

      {!topGainersLosersData?.success ? (
        <AlertMessage message={topGainersLosersData?.message} />
      ) : (
        <TopGainersLosers
          title="🚨 Top Losers"
          data={topGainersLosersData?.top_losers}
        />
      )}

      {!trendingCoinsData?.success ? (
        <AlertMessage message={trendingCoinsData?.message} />
      ) : (
        <TrendingCoins
          title="Trending Coins"
          data={trendingCoinsData?.coins}
          className="col-span-1 xl:col-span-2"
        />
      )}
    </div>
  );
}
