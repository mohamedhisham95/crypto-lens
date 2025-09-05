'use client';

import { useQuery } from '@tanstack/react-query';

// Actions
import {
  getGlobalData,
  getTopGainersLosers,
  getTrendingCoins,
} from '@/actions';

// Types
import type {
  GlobalDataResponse,
  TopGainersLosersResponse,
  TrendingCoinsResponse,
} from '@/types/dashboard';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import {
  MarketCap,
  Volume,
  TopGainersLosers,
  TrendingCoins,
} from '@/components/dashboard';
import { AlertMessage } from '@/components/common';

type Props = {
  initialGlobalData: GlobalDataResponse;
  initialTopGainersLosersData: TopGainersLosersResponse;
  initialTrendingCoinsData: TrendingCoinsResponse;
};

export function DashboardWrapper({
  initialGlobalData,
  initialTopGainersLosersData,
  initialTrendingCoinsData,
}: Props) {
  const { data: globalData, isFetching: isGlobalDataFetching } =
    useQuery<GlobalDataResponse>({
      initialData: initialGlobalData,
      queryKey: ['global_data'],
      queryFn: () => getGlobalData(),
      refetchInterval: refetch_interval['global_data'],
    });

  const {
    data: topGainerLosersData,
    isFetching: isTopGainersLosersDataFetching,
  } = useQuery<TopGainersLosersResponse>({
    initialData: initialTopGainersLosersData,
    queryKey: ['top_gainers_losers'],
    queryFn: () => getTopGainersLosers(),
    refetchInterval: refetch_interval['top_gainers_losers'],
  });

  const { data: trendingCoinsData, isFetching: isTrendingCoinsDataFetching } =
    useQuery<TrendingCoinsResponse>({
      initialData: initialTrendingCoinsData,
      queryKey: ['trending_coins'],
      queryFn: () => getTrendingCoins(),
      refetchInterval: refetch_interval['trending_coins'],
    });

  return (
    <>
      {!globalData?.success ? (
        <AlertMessage message={globalData?.message} />
      ) : (
        <MarketCap
          totalMarketCap={globalData?.global_data?.total_market_cap}
          chgPercentage24h={
            globalData?.global_data?.market_cap_change_percentage_24h_usd || 0
          }
          isFetching={isGlobalDataFetching}
        />
      )}

      {!globalData?.success ? (
        <AlertMessage message={globalData?.message} />
      ) : (
        <Volume
          totalVolume={globalData?.global_data?.total_volume}
          isFetching={isGlobalDataFetching}
        />
      )}

      {!topGainerLosersData?.success ? (
        <AlertMessage message={topGainerLosersData?.message} />
      ) : (
        <TopGainersLosers
          title="🚀 Top Gainers"
          data={topGainerLosersData?.top_gainers}
          isFetching={isTopGainersLosersDataFetching}
        />
      )}

      {!topGainerLosersData?.success ? (
        <AlertMessage message={topGainerLosersData?.message} />
      ) : (
        <TopGainersLosers
          title="🚨 Top Losers"
          data={topGainerLosersData?.top_losers}
          isFetching={isTopGainersLosersDataFetching}
        />
      )}

      {!trendingCoinsData?.success ? (
        <AlertMessage message={trendingCoinsData?.message} />
      ) : (
        <TrendingCoins
          title="Trending Coins"
          data={trendingCoinsData?.coins}
          className="col-span-1 xl:col-span-2"
          isFetching={isTrendingCoinsDataFetching}
        />
      )}
    </>
  );
}
