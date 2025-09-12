'use client';

import React, { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';

// Icons
import { Info } from 'lucide-react';

// Lib
import { apiFetcher } from '@/lib/api-fetcher';
import { formatCurrency, formatDate } from '@/lib/formatter';

// Types
import { ExchangeVolumeChartDataResponse } from '@/types/exchange';

// Config
import { refetch_interval } from '@/constants/refetch-interval';

// Components
import { AreaChartSkeleton } from '@/components/skeletons';
import { AlertMessage, TooltipWrapper } from '@/components/common';

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
  volume: {
    label: 'Volume',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type Props = {
  title: string;
  className?: string;
  exchangeId: string;
};

export const VolumeChart = React.memo(function VolumeChart({
  title,
  className,
  exchangeId,
}: Props) {
  // Local State
  const [days, setDays] = useState(90);

  // Exchange Volume Chart Data
  const { data, isFetching, isError, error } =
    useQuery<ExchangeVolumeChartDataResponse>({
      queryKey: ['exchange_volume_chart_data', days, exchangeId],
      queryFn: () =>
        apiFetcher(`/exchange/${exchangeId}/volume-chart-data`, {
          days,
        }),
      enabled: !!exchangeId,
      refetchInterval: refetch_interval['exchange'],
    });

  // UseMemo
  const chartData = useMemo(() => {
    if (!data?.success) {
      return [];
    }

    return data.volume.map((priceItem) => {
      const [timestamp, volume] = priceItem;

      const formattedDate = formatDate({
        type: 'y-m-d',
        date: timestamp,
      });

      return {
        date: formattedDate,
        volume: Number(volume),
      };
    });
  }, [data]);

  return (
    <Card className={`px-3 ${className}`}>
      <CardHeader className="px-0 flex flex-col gap-4 xl:flex-row xl:justify-between">
        <CardTitle>
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <TooltipWrapper
              side="bottom"
              content={
                <div className="flex items-center gap-1">
                  <span className="text-xs">Cache / Update Frequency:</span>
                  <span className="text-xs">
                    {refetch_interval['exchange'] / (60 * 1000)} Minutes
                  </span>
                </div>
              }
            >
              <Info className="icon-sm stroke-muted-foreground" />
            </TooltipWrapper>
          </div>
        </CardTitle>
        <CardAction className="flex items-center gap-2">
          <Select
            value={days.toString()}
            onValueChange={(v) => setDays(Number(v))}
          >
            <SelectTrigger className="w-[90px]" size="sm">
              <SelectValue placeholder="Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1D</SelectItem>
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
                <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-volume)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-volume)"
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
                    ...([1, 7].includes(days) && {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  });
                }}
              />

              <YAxis
                dataKey={'volume'}
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
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }
                    indicator="dot"
                    formatter={(value) => [
                      formatCurrency({ amount: Number(value) }),
                    ]}
                  />
                }
              />

              <Area
                dataKey={'volume'}
                type="monotone"
                fill={'url(#fillVolume)'}
                stroke={'var(--color-volume)'}
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
        ) : isError && !isFetching ? (
          <div className="h-[400px]">
            <AlertMessage message={error?.message} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
});
