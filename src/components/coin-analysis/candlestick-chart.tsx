'use client';

import React, { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

// Icons
import { Info } from 'lucide-react';

// Lib
import { formatCurrency, formatDate } from '@/lib/formatter';

// Types
import { CoinOHLCChartDataResponse } from '@/types/coin';

// Config
import { refetch_interval } from '@/constants/refetch-interval';

// Components
import { AlertMessage, TooltipWrapper } from '@/components/common';
import { AreaChartSkeleton } from '@/components/skeletons';

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
import { apiFetcher } from '@/lib/api-fetcher';

type Props = {
  title: string;
  coinId: string;
  className?: string;
};

export const CandlestickChart = React.memo(function CandlestickChart({
  title,
  coinId,
  className,
}: Props) {
  // Local State
  const [days, setDays] = useState(1);

  // Hook
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Coin OHLC Chart Data
  const { data, isFetching, error, isError } =
    useQuery<CoinOHLCChartDataResponse>({
      queryKey: ['coin_ohlc_chart_data', days, coinId],
      queryFn: () =>
        apiFetcher(`/coin-analysis/${coinId}/ohlc-chart-data`, {
          coin_id: coinId,
          days,
          vs_currency: 'usd',
          precision: 2,
        }),
      enabled: !!coinId,
      refetchInterval: refetch_interval['coin_ohlc_chart_data'],
    });

  const upColor = '#00bc7d';
  const downColor = '#f9245a';

  const option = useMemo(() => {
    if (!data?.success) {
      return null;
    }

    const axisLabelColor = currentTheme === 'dark' ? '#8398af' : '#71717b';
    const tooltipBgColor = currentTheme === 'dark' ? '#070f17' : '#ffffff';
    const tooltipBorderColor = currentTheme === 'dark' ? '#070f17' : '#ffffff';
    const tooltipTextColor = currentTheme === 'dark' ? '#ffffff' : '#070f17';
    const yaxisSplitLineColor = currentTheme === 'dark' ? '#8398af' : '#263950';

    const categoryData: string[] = [];
    const values: [number, number, number, number][] = [];
    for (let i = 0; i < data?.ohlc.length; i++) {
      categoryData.push(
        days === 1
          ? formatDate({ type: 'date-month-time', date: data?.ohlc[i][0] })
          : formatDate({ type: 'full-date', date: data?.ohlc[i][0] })
      );

      values.push([
        data?.ohlc[i][1],
        data?.ohlc[i][4],
        data?.ohlc[i][3],
        data?.ohlc[i][2],
      ]);
    }

    const transformedData = {
      categoryData: categoryData,
      values: values,
    };

    return {
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: ['OHLC'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        borderRadius: 16,
        padding: 10,
        backgroundColor: tooltipBgColor,
        textStyle: { color: tooltipTextColor },
        position: function (
          pos: number[],
          params: null,
          el: HTMLElement,
          elRect: null,
          size: { viewSize: number[] }
        ) {
          const obj: Record<string, number> = {
            top: 10,
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (params: any) {
          const data = params[0].data;

          const date =
            days === 1
              ? formatDate({ type: 'full-date-time', date: data[5] })
              : formatDate({ type: 'full-date', date: data[5] });

          // const date = data[5];
          const open = data[1].toFixed(2);
          const close = data[2].toFixed(2);
          const low = data[3].toFixed(2);
          const high = data[4].toFixed(2);

          return `
          <div style="
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 160px;
          ">
            <div style="
              font-weight: 600;
              margin-bottom: 4px;
            ">
              ${date}
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: ${axisLabelColor}; font-size: 12px">Open:</span>
              <span style="font-size: 12px; font-weight: 600">${formatCurrency({
                amount: open,
              })}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: ${axisLabelColor}; font-size: 12px">High:</span>
              <span style="font-size: 12px; font-weight: 600">${formatCurrency({
                amount: high,
              })}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: ${axisLabelColor}; font-size: 12px">Low:</span>
              <span style="font-size: 12px; font-weight: 600">${formatCurrency({
                amount: low,
              })}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: ${axisLabelColor}; font-size: 12px">Close:</span>
              <span style="font-size: 12px; font-weight: 600">${formatCurrency({
                amount: close,
              })}</span>
            </div>
          </div>
        `;
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all',
          },
        ],
        label: {
          backgroundColor: '#777',
        },
      },
      toolbox: {
        show: false,
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: downColor,
          },
          {
            value: -1,
            color: upColor,
          },
        ],
      },
      grid: [
        {
          top: 30,
          // left: '10%',
          left: '13%',
          right: 10,
          height: '65%',
        },
        {
          top: '80%',
          left: 10,
          right: 10,
          height: '15%',
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: transformedData.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100,
          },
          axisLabel: {
            color: axisLabelColor,
            formatter: function (value: string) {
              return value;
            },
          },
        },
        {
          type: 'category',
          gridIndex: 1,
          data: transformedData.categoryData,
          boundaryGap: false,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      yAxis: [
        {
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: yaxisSplitLineColor,
              opacity: 0.3,
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            color: axisLabelColor,
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          show: days === 1 ? false : true,
          // xAxisIndex: [0, 1],
          type: 'slider',
          top: '80%',
          start: 50,
          end: 100,
        },
      ],
      series: [
        {
          name: '',
          type: 'candlestick',
          data: transformedData.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: undefined,
            borderColor0: undefined,
          },
        },
      ],
    };
  }, [data, days, currentTheme]);

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
                    {refetch_interval['coin_ohlc_chart_data'] / (60 * 1000)}{' '}
                    Minutes
                  </span>
                </div>
              }
            >
              <Info className="icon-sm stroke-muted-foreground" />
            </TooltipWrapper>
          </div>
        </CardTitle>
        <CardAction className="flex items-center gap-2">
          {/* {(option !== null || !data?.success) && ( */}
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
          {/* )} */}
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 max-h-[500px] h-[500px]">
        {isFetching ? (
          <div className="h-[500px] relative flex items-center justify-center bg-transparent">
            <AreaChartSkeleton />
          </div>
        ) : data && data.success && !isFetching && option !== null ? (
          <ReactECharts option={option} style={{ height: '100%' }} />
        ) : isError && !isFetching ? (
          <AlertMessage message={error?.message} />
        ) : null}
      </CardContent>
    </Card>
  );
});
