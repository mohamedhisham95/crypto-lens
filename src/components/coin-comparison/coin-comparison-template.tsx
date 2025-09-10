'use client';

import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Types
import type { CoinDataResponse, CoinInfo, CoinOverview } from '@/types/coin';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Config
import { refetch_interval } from '@/config/refetch-interval';

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
  const { data: coinData, isFetching } = useQuery<CoinDataResponse>({
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

      {isFetching && !coinData ? (
        <CoinInformation data={{} as CoinInfo} isFetching={true} />
      ) : coinData && !coinData.success ? (
        <AlertMessage className="h-[88px]" message={coinData.message} />
      ) : coinData ? (
        <CoinInformation data={coinData.coin_info} isFetching={isFetching} />
      ) : null}

      {isFetching && !coinData ? (
        <Overview
          title="Overview"
          data={{} as CoinOverview}
          isFetching={true}
        />
      ) : coinData && !coinData.success ? (
        <AlertMessage className="h-[510px]" message={coinData.message} />
      ) : coinData ? (
        <Overview
          title="Overview"
          data={coinData?.coin_overview}
          isFetching={isFetching}
        />
      ) : null}

      <HistoricalChart title="Historical Data" coinId={coinId} />

      <CandlestickChart title="Candlestick" coinId={coinId} />
    </div>
  );
}
