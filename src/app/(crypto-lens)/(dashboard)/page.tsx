// Actions
import {
  getTopGainersLosers,
  getGlobalData,
  getTrendingCoins,
} from '@/actions';

// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import {
  TopGainersLosers,
  MarketCap,
  Volume,
  TrendingCoins,
} from '@/components/dashboard';
import { AlertMessage } from '@/components/common';

export const metadata = getMetadata('dashboard');

export default async function DashboardPage() {
  const topGainerLosersData = await getTopGainersLosers();
  const globalData = await getGlobalData();
  const trendingCoinsData = await getTrendingCoins();

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {!globalData?.success ? (
          <AlertMessage message={globalData?.message} />
        ) : (
          <MarketCap
            totalMarketCap={globalData?.global_data?.total_market_cap}
            chgPercentage24h={
              globalData?.global_data?.market_cap_change_percentage_24h_usd || 0
            }
          />
        )}

        {!globalData?.success ? (
          <AlertMessage message={globalData?.message} />
        ) : (
          <Volume totalVolume={globalData?.global_data?.total_volume} />
        )}

        {!topGainerLosersData?.success ? (
          <AlertMessage message={topGainerLosersData?.message} />
        ) : (
          <TopGainersLosers
            title="🚀 Top Gainers"
            data={topGainerLosersData?.top_gainers}
          />
        )}

        {!topGainerLosersData?.success ? (
          <AlertMessage message={topGainerLosersData?.message} />
        ) : (
          <TopGainersLosers
            title="🚨 Top Losers"
            data={topGainerLosersData?.top_losers}
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
    </div>
  );
}
