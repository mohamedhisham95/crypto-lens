'use client';

import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Actions
import { getCoinData } from '@/actions';

// Types
import type { CoinDataResponse, CoinInfo, CoinOverview } from '@/types/coin';

// Components
import { AlertMessage } from '@/components/common';
import { CoinSearch } from '@/components/coin-comparison';
import {
  CoinInformation,
  HistoricalChart,
  Overview,
  CandlestickChart,
} from '@/components/coin';

type Props = {
  defaultCoin: string;
};

export function CoinComparisonTemplate({ defaultCoin }: Props) {
  // Local State
  const [coinId, setCoinId] = useState(defaultCoin);

  // Coin Search
  const { data: coinData, isFetching } = useQuery<CoinDataResponse>({
    queryKey: ['coin_data', coinId],
    queryFn: () => getCoinData(coinId),
  });

  // Handle Select Coin Callback
  const handleSelectCoinCallback = useCallback(
    (coinId: string) => {
      setCoinId(coinId);
    },
    [setCoinId]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        <CoinSearch handleSelectCoinCallback={handleSelectCoinCallback} />

        {isFetching && !coinData ? (
          <CoinInformation data={{} as CoinInfo} isFetching={true} />
        ) : coinData && !coinData.success ? (
          <AlertMessage message={coinData.message} />
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
          <AlertMessage message={coinData.message} />
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
    </div>
  );
}
