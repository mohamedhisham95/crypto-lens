// Actions
import { getCoinData } from '@/actions/';

// Lib
import { getMetadata } from '@/lib/metadata';

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
} from '@/components/coin';

export const metadata = getMetadata('coin_analysis');

export default async function CoinPage({
  params,
}: {
  params: { coin_id: string };
}) {
  const { coin_id } = await params;

  const coinData = await getCoinData(coin_id);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {!coinData?.success ? (
          <AlertMessage message={coinData?.message} />
        ) : (
          <CoinInformation data={coinData?.coin_info} />
        )}

        <CoinSearch />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <HistoricalChart
          title="Historical Data"
          className="col-span-1 xl:col-span-3"
          coinId={coin_id}
        />

        {!coinData?.success ? (
          <AlertMessage message={coinData?.message} />
        ) : (
          <Overview
            title="Overview"
            data={coinData?.coin_overview}
            className="col-span-1 xl:col-span-2"
          />
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <CandlestickChart
          title="Candlestick"
          className="col-span-1 xl:col-span-3"
          coinId={coin_id}
        />

        <div className="col-span-1 xl:col-span-2">
          {!coinData?.success ? (
            <AlertMessage message={coinData?.message} />
          ) : (
            <PriceChangePercentage
              data={coinData?.coin_price_and_change_percentage}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {!coinData?.success ? (
          <AlertMessage message={coinData?.message} />
        ) : (
          <CoinLinks
            title="Links"
            data={coinData?.coin_links}
            className="col-span-1 xl:col-span-2"
          />
        )}
      </div>
    </div>
  );
}
