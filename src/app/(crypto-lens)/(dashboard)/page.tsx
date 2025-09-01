// Actions
import { getTopGainersLosers, getGlobalData } from '@/actions';

// Components
import { TopGainersLosers, MarketCap, Volume } from '@/components/dashboard';
import { AlertMessage } from '@/components/common';

export default async function DashboardPage() {
  const topGainerLosersData = await getTopGainersLosers();
  const globalData = await getGlobalData();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
