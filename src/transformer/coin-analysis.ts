import {
  CoinInfo,
  CoinOverview,
  Links,
  CoinPriceAndChangePercentage,
  CoinData,
  CoinHistoricalChartData,
  CoinOHLCChartData,
} from '@/types/coin';

export function transformCoinData(coin_data: CoinData) {
  const coin_info: CoinInfo = {
    rank: coin_data?.market_cap_rank,
    name: coin_data?.name,
    image: coin_data?.image?.small,
    symbol: coin_data?.symbol,
    description: coin_data?.description?.en,
    current_price_in_usd: coin_data?.market_data?.current_price?.usd,
    chg_percentage_24h_in_usd:
      coin_data?.market_data?.price_change_percentage_24h_in_currency?.usd,
  };

  const coin_overview: CoinOverview = {
    market_cap: coin_data?.market_data?.market_cap,
    market_cap_fdv_ratio: coin_data?.market_data?.market_cap_fdv_ratio,
    fully_diluted_valuation: coin_data?.market_data?.fully_diluted_valuation,
    circulating_supply: coin_data?.market_data?.circulating_supply,
    total_supply: coin_data?.market_data?.total_supply,
    max_supply: coin_data?.market_data?.max_supply,
    total_volume: coin_data?.market_data?.total_volume,
    low_24h: coin_data?.market_data?.low_24h,
    high_24h: coin_data?.market_data?.high_24h,
    current_price: coin_data?.market_data?.current_price,
  };

  const coin_links: Links = {
    homepage: coin_data?.links?.homepage,
    whitepaper: coin_data?.links?.whitepaper,
    blockchain_site: coin_data?.links?.blockchain_site,
    official_forum_url: coin_data?.links?.official_forum_url,
    announcement_url: coin_data?.links?.announcement_url,
    subreddit_url: coin_data?.links?.subreddit_url,
  };

  const coin_price_and_change_percentage: CoinPriceAndChangePercentage = {
    price_change_percentage_1h_in_currency:
      coin_data?.market_data?.price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency:
      coin_data?.market_data?.price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency:
      coin_data?.market_data?.price_change_percentage_7d_in_currency,
    price_change_percentage_14d_in_currency:
      coin_data?.market_data?.price_change_percentage_14d_in_currency,
    price_change_percentage_30d_in_currency:
      coin_data?.market_data?.price_change_percentage_30d_in_currency,
    price_change_percentage_60d_in_currency:
      coin_data?.market_data?.price_change_percentage_60d_in_currency,
    price_change_percentage_200d_in_currency:
      coin_data?.market_data?.price_change_percentage_200d_in_currency,
    price_change_percentage_1y_in_currency:
      coin_data?.market_data?.price_change_percentage_1y_in_currency,
    price_change_24h_in_currency:
      coin_data?.market_data?.price_change_24h_in_currency,
    market_cap_change_24h_in_currency:
      coin_data?.market_data?.market_cap_change_24h_in_currency,
    market_cap_change_percentage_24h_in_currency:
      coin_data?.market_data?.market_cap_change_percentage_24h_in_currency,
  };

  return {
    coin_info,
    coin_overview,
    coin_links,
    coin_price_and_change_percentage,
  };
}

export function transformHistoricalChartData(
  coin_historical_chart_data: CoinHistoricalChartData
) {
  return {
    prices: coin_historical_chart_data?.prices || [],
    market_caps: coin_historical_chart_data?.market_caps || [],
  };
}

export function transformOHLCChartData(
  coin_ohlc_chart_data: CoinOHLCChartData[]
) {
  return {
    ohlc: coin_ohlc_chart_data || [],
  };
}
