'use client';

import React, { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

// Actions
import { getCoinHistoricalChartData } from '@/actions/coin-analysis';

// Types
import { CoinHistoricalChartDataResponse } from '@/types/coin';

// Components
import { AreaChartSkeleton } from '@/components/skeletons';
import { AlertMessage } from '@/components/common';

// UI
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'var(--chart-1)',
  },
  market_cap: {
    label: 'Market Cap',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type Props = {
  title: string;
  className?: string;
  coinId: string;
};

export const HistoricalChart = React.memo(function HistoricalChart({
  title,
  className,
  coinId,
}: Props) {
  // Local State
  const [interval, setInterval] = useState('daily');
  const [days, setDays] = useState(90);
  const [chartType, setChartType] = useState('price');

  // Coin Historical Chart Data
  const { data, isFetching } = useQuery<CoinHistoricalChartDataResponse>({
    queryKey: ['coin_historical_chart_data', days, interval, coinId],
    queryFn: () =>
      getCoinHistoricalChartData({
        coin_id: coinId,
        days,
        interval,
        vs_currency: 'usd',
      }),
    enabled: !!coinId,
  });

  // UseMemo
  const chartData = useMemo(() => {
    if (!data?.success) {
      return [];
    }

    return data.prices.map((priceItem, index) => {
      const [timestamp, price] = priceItem;
      const [, market_caps] = data.market_caps[index];

      // Use Day.js to format the timestamp
      const formattedDate = dayjs(timestamp).format('YYYY-MM-DD');

      return {
        date: formattedDate,
        price: price,
        market_cap: market_caps,
      };
    });
  }, [data]);

  return (
    <Card className={`px-3 ${className}`}>
      <CardHeader className="px-0 flex flex-col gap-4 xl:flex-row xl:justify-between">
        <CardTitle>{title}</CardTitle>
        <CardAction className="flex items-center gap-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[130px]" size="sm">
              <SelectValue placeholder="Chart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="market_cap">Market Cap</SelectItem>
            </SelectContent>
          </Select>
          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="w-[100px]" size="sm">
              <SelectValue placeholder="Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={days.toString()}
            onValueChange={(v) => setDays(Number(v))}
          >
            <SelectTrigger className="w-[90px]" size="sm">
              <SelectValue placeholder="Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7D</SelectItem>
              <SelectItem value="14">14D</SelectItem>
              <SelectItem value="30">30D</SelectItem>
              <SelectItem value="90">90D</SelectItem>
              <SelectItem value="180">180D</SelectItem>
              <SelectItem value="365">1Y</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        {isFetching ? (
          <div className="h-[400px] relative">
            <AreaChartSkeleton />
          </div>
        ) : data && data.success && !isFetching ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[400px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-price)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-price)"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient id="fillMarketCap" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-market_cap)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-market_cap)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <YAxis
                dataKey={chartType === 'price' ? 'price' : 'market_cap'}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
                interval="preserveStartEnd"
                minTickGap={10}
                // domain={['auto', 'auto']}
                domain={['dataMin', 'auto']}
                allowDataOverflow={true}
                tickFormatter={(value) => {
                  // Format billions, millions, thousands, etc.
                  if (value >= 1_000_000_000_000) {
                    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
                  } else if (value >= 1_000_000_000) {
                    return `$${(value / 1_000_000_000).toFixed(1)}B`;
                  } else if (value >= 1_000_000) {
                    return `$${(value / 1_000_000).toFixed(1)}M`;
                  } else if (value >= 1_000) {
                    return `$${(value / 1_000).toFixed(1)}K`;
                  }
                  return `$${value}`;
                }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey={chartType}
                type="monotone"
                fill={
                  chartType === 'price'
                    ? 'url(#fillPrice)'
                    : 'url(#fillMarketCap)'
                }
                stroke={
                  chartType === 'price'
                    ? 'var(--color-price)'
                    : 'var(--color-market_cap)'
                }
                stackId="a"
                isAnimationActive={true}
                dot={false}
                connectNulls={true}
                clipPath={undefined}
                baseValue="dataMin"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        ) : data && !data.success && !isFetching ? (
          <div className="h-[400px]">
            <AlertMessage message={data?.message} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
});
