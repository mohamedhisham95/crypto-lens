'use client';

import { useQuery } from '@tanstack/react-query';

// Types
import {
  CoinDataResponse,
  CoinInfo,
  CoinOverview,
  CoinPriceAndChangePercentage,
  Links,
} from '@/types/coin';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { AlertMessage } from '@/components/common';
import {
  CoinInformation,
  CoinSearch,
  Overview,
  HistoricalChart,
  CoinLinks,
  PriceChangePercentage,
  CandlestickChart,
} from '@/components/coin-analysis';

type Props = {
  coinId: string;
  initialData: CoinDataResponse;
};

export function CoinAnalysisTemplate({ coinId, initialData }: Props) {
  // Coin Data
  const { data: coinData, isFetching } = useQuery<CoinDataResponse>({
    initialData: initialData,
    queryKey: ['coin_data', coinId],
    queryFn: () =>
      apiFetcher(`/coin-analysis/${coinId}/coin-data`, {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
    refetchInterval: refetch_interval['coin_analysis'],
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {isFetching && !coinData ? (
          <CoinInformation data={{} as CoinInfo} isFetching={true} />
        ) : coinData && !coinData.success ? (
          <AlertMessage className="h-[88px]" message={coinData.message} />
        ) : coinData ? (
          <CoinInformation data={coinData.coin_info} isFetching={isFetching} />
        ) : null}

        <CoinSearch />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <HistoricalChart
          title="Historical Data"
          className="col-span-1 xl:col-span-3"
          coinId={coinId}
        />

        {isFetching && !coinData ? (
          <Overview
            title="Overview"
            data={{} as CoinOverview}
            isFetching={true}
            className="col-span-1 xl:col-span-2"
          />
        ) : coinData && !coinData.success ? (
          <AlertMessage className="h-[510px]" message={coinData.message} />
        ) : coinData ? (
          <Overview
            title="Overview"
            data={coinData?.coin_overview}
            isFetching={isFetching}
            className="col-span-1 xl:col-span-2"
          />
        ) : null}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <CandlestickChart
          title="Candlestick"
          className="col-span-1 xl:col-span-3"
          coinId={coinId}
        />

        <div className="col-span-1 xl:col-span-2">
          {isFetching && !coinData ? (
            <PriceChangePercentage
              data={{} as CoinPriceAndChangePercentage}
              isFetching={isFetching}
            />
          ) : coinData && !coinData.success ? (
            <AlertMessage className="h-[510px]" message={coinData.message} />
          ) : coinData ? (
            <PriceChangePercentage
              data={coinData?.coin_price_and_change_percentage}
            />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {isFetching && !coinData ? (
          <CoinLinks
            title="Links"
            data={{} as Links}
            className="col-span-1 xl:col-span-3"
          />
        ) : coinData && !coinData.success ? (
          <AlertMessage className="h-[510px]" message={coinData.message} />
        ) : coinData ? (
          <CoinLinks
            title="Links"
            data={coinData?.coin_links}
            className="col-span-1 xl:col-span-3"
          />
        ) : null}
      </div>
    </div>
  );
}
