'use client';

import { useQuery } from '@tanstack/react-query';

// Types
import { GlobalDataResponse } from '@/types/dashboard';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { AlertMessage } from '@/components/common';
import { MarketCap, Volume } from '@/components/dashboard';

type Props = {
  initialData: GlobalDataResponse;
};

export function MarketCapAndVolume({ initialData }: Props) {
  // Global Data
  const {
    data: globalData,
    isFetching,
    error,
    isError,
  } = useQuery<GlobalDataResponse>({
    initialData: initialData,
    queryKey: ['global_data'],
    queryFn: () => apiFetcher(`/dashboard/global-data`),
    refetchInterval: refetch_interval['global_data'],
  });
  return (
    <>
      {/* Market Cap */}
      {isFetching && !globalData && (
        <MarketCap
          totalMarketCap={{}}
          chgPercentage24h={0}
          isFetching={isFetching}
        />
      )}

      {!isFetching && (isError || (globalData && !globalData.success)) && (
        <AlertMessage
          message={(error as Error)?.message || 'An error occurred.'}
        />
      )}

      {!isFetching && globalData && globalData.success && (
        <MarketCap
          totalMarketCap={globalData?.global_data?.total_market_cap}
          chgPercentage24h={
            globalData?.global_data?.market_cap_change_percentage_24h_usd
          }
        />
      )}

      {/* Volume */}
      {isFetching && !globalData && (
        <Volume totalVolume={{}} isFetching={isFetching} />
      )}

      {!isFetching && (isError || (globalData && !globalData.success)) && (
        <AlertMessage
          message={(error as Error)?.message || 'An error occurred.'}
        />
      )}

      {!isFetching && globalData && globalData.success && (
        <Volume totalVolume={globalData?.global_data?.total_volume} />
      )}
    </>
  );
}
