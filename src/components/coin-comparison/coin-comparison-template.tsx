'use client';

import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Types
import type { CoinDataResponse, CoinInfo, CoinOverview } from '@/types/coin';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Config
import { refetch_interval } from '@/constants/refetch-interval';

// Components
import { AlertMessage } from '@/components/common';
import { CoinSearch } from '@/components/coin-comparison';
import {
  CoinInformation,
  HistoricalChart,
  Overview,
  CandlestickChart,
} from '@/components/coin-analysis';

type Props = {
  defaultCoin: string;
};

export function CoinComparisonTemplate({ defaultCoin }: Props) {
  // Local State
  const [coinId, setCoinId] = useState(defaultCoin);

  // Coin Data
  const {
    data: coinData,
    isFetching,
    error,
    isError,
  } = useQuery<CoinDataResponse>({
    queryKey: ['coin_data', coinId],
    queryFn: () =>
      apiFetcher(`/coin-analysis/${coinId}/coin-data`, {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
    refetchInterval: refetch_interval['coin_comparison'],
  });

  // Handle Select Coin Callback
  const handleSelectCoinCallback = useCallback(
    (coinId: string) => {
      setCoinId(coinId);
    },
    [setCoinId]
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <CoinSearch handleSelectCoinCallback={handleSelectCoinCallback} />

      {/* Coin Information */}
      {isFetching && !coinData && (
        <CoinInformation data={{} as CoinInfo} isFetching={true} />
      )}

      {!isFetching && (isError || (coinData && !coinData.success)) && (
        <AlertMessage
          className="h-[88px]"
          message={(error as Error)?.message || 'An error occurred.'}
        />
      )}

      {!isFetching && coinData && coinData.success && (
        <CoinInformation data={coinData.coin_info} isFetching={isFetching} />
      )}

      {/* Overview */}
      {isFetching && !coinData && (
        <Overview
          title="Overview"
          data={{} as CoinOverview}
          isFetching={true}
        />
      )}

      {!isFetching && (isError || (coinData && !coinData.success)) && (
        <AlertMessage
          className="h-[510px]"
          message={(error as Error)?.message || 'An error occurred.'}
        />
      )}

      {!isFetching && coinData && coinData.success && (
        <Overview
          title="Overview"
          data={coinData?.coin_overview}
          isFetching={isFetching}
        />
      )}

      {/* Historical Chart */}
      <HistoricalChart title="Historical Data" coinId={coinId} />

      {/* Candlestick Chart */}
      <CandlestickChart title="Candlestick" coinId={coinId} />
    </div>
  );
}
