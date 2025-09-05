const calculateInterval = (minute: number) => minute * 60 * 1000;

export const refetch_interval = {
  global_data: calculateInterval(10),
  top_gainers_losers: calculateInterval(2),
  trending_coins: calculateInterval(10),
  coin_historical_chart_data: calculateInterval(2),
  coin_ohlc_chart_data: calculateInterval(15),
};
