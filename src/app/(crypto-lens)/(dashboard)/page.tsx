// Actions
import {
  getTopGainersLosers,
  getGlobalData,
  getTrendingCoins,
} from '@/actions';

// Lib
import { getMetadata } from '@/lib/metadata';

// Components
import { DashboardWrapper } from '@/components/dashboard';

export const metadata = getMetadata('dashboard');

export default async function DashboardPage() {
  const globalData = await getGlobalData();
  const topGainersLosersData = await getTopGainersLosers();
  const trendingCoinsData = await getTrendingCoins();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <DashboardWrapper
        initialGlobalData={globalData}
        initialTopGainersLosersData={topGainersLosersData}
        initialTrendingCoinsData={trendingCoinsData}
      />
    </div>
  );
}
