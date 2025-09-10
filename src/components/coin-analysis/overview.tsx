'use client';

import React, { useMemo, useState } from 'react';

// Lib
import { formatCurrency, formatNumber } from '@/lib/formatter';
import { cn } from '@/lib/utils';

// Types
import { CoinOverview } from '@/types/coin';

// Components
import { PriceRangeBar } from '@/components/common';

// UI
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
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

type Props = {
  title: string;
  data: CoinOverview;
  className?: string;
  isFetching?: boolean;
};

export function Overview({ title, data, className, isFetching }: Props) {
  // Local State
  const [currency, setCurrency] = useState('usd');

  // UseMemo
  const transformedData = useMemo(() => {
    if (!data || isFetching) return [];
    return [
      {
        title: 'Current Price',
        type: 'currency',
        value: data?.current_price[currency],
      },
      {
        title: 'Total Volume',
        type: 'currency',
        value: data?.total_volume[currency],
      },
      {
        title: 'Market Cap',
        type: 'currency',
        value: data?.market_cap[currency],
      },
      {
        title: 'Market Cap / FDV',
        type: 'ratio',
        value: data?.market_cap_fdv_ratio,
      },
      {
        title: 'Fully Diluted Valuation',
        type: 'currency',
        value: data?.fully_diluted_valuation[currency],
      },
      {
        title: 'Circulating Supply',
        type: 'number',
        value: data?.circulating_supply,
      },
      {
        title: 'Total Supply',
        type: 'number',
        value: data?.total_supply,
      },
      {
        title: 'Max Supply',
        type: 'number',
        value: data?.max_supply,
      },
    ];
  }, [data, currency, isFetching]);

  return (
    <Card className={`px-3 h-[510px] ${className}`}>
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>

        {!isFetching ? (
          <CardAction>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(data?.market_cap).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-2">
        {isFetching ? (
          <Skeleton className="h-[125px] w-full rounded-xl" />
        ) : (
          <PriceRangeBar
            low={data?.low_24h[currency]}
            high={data?.high_24h[currency]}
            current={data?.current_price[currency]}
            currency={currency.toUpperCase()}
          />
        )}

        <Table>
          <TableBody>
            {isFetching
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={`loading-${index}`}
                    className="hover:bg-transparent border-b-0"
                  >
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : transformedData?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cn(index % 2 === 0 && 'bg-muted/50')}
                  >
                    <TableCell className="text-muted-foreground">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.type === 'number'
                        ? formatNumber(item.value)
                        : item.type === 'currency'
                        ? formatCurrency({
                            amount: item.value,
                            currency: currency.toUpperCase(),
                          })
                        : item.value.toFixed(1) || '-'}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
