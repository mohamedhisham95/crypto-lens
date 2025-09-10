'use client';

import { useQuery } from '@tanstack/react-query';

// Types
import { TopGainersLosersResponse } from '@/types/dashboard';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { AlertMessage } from '@/components/common';
import { TopGainersLosers } from '@/components/dashboard';

type Props = {
  initialData: TopGainersLosersResponse;
};

export function TopGainersLosersTemplate({ initialData }: Props) {
  // Top Gainers Losers Data
  const {
    data: topGainersLosersData,
    isFetching,
    error,
    isError,
  } = useQuery<TopGainersLosersResponse>({
    initialData: initialData,
    queryKey: ['top_gainers_losers'],
    queryFn: () => apiFetcher(`/dashboard/top-gainers-losers`),
    refetchInterval: refetch_interval['top_gainers_losers'],
  });

  return (
    <>
      {/* Gainers */}
      {isFetching && !topGainersLosersData && (
        <TopGainersLosers
          title="🚀 Top Gainers"
          data={[]}
          isFetching={isFetching}
        />
      )}

      {!isFetching &&
        (isError ||
          (topGainersLosersData && !topGainersLosersData.success)) && (
          <AlertMessage
            message={(error as Error)?.message || 'An error occurred.'}
          />
        )}

      {!isFetching && topGainersLosersData && topGainersLosersData.success && (
        <TopGainersLosers
          title="🚀 Top Gainers"
          data={topGainersLosersData?.top_gainers}
        />
      )}

      {/* Losers */}
      {isFetching && !topGainersLosersData && (
        <TopGainersLosers
          title="🚨 Top Losers"
          data={[]}
          isFetching={isFetching}
        />
      )}

      {!isFetching &&
        (isError ||
          (topGainersLosersData && !topGainersLosersData.success)) && (
          <AlertMessage
            message={(error as Error)?.message || 'An error occurred.'}
          />
        )}

      {!isFetching && topGainersLosersData && topGainersLosersData.success && (
        <TopGainersLosers
          title="🚀 Top Gainers"
          data={topGainersLosersData?.top_losers}
        />
      )}
    </>
  );
}
