'use client';

import { useMemo, useState } from 'react';

// Lib
import { formatCurrency } from '@/lib/formatter';

// Types
import { CoinPriceAndChangePercentage } from '@/types/coin';

// Components
import { Percentage } from '@/components/common';

// UI
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data: CoinPriceAndChangePercentage;
  isFetching?: boolean;
};

export function PriceChangePercentage({ data, isFetching }: Props) {
  // Local State
  const [currency, setCurrency] = useState('usd');

  const transformedData = useMemo(() => {
    if (!data || isFetching) return [];
    return [
      {
        title: 'Price Chg',
        time_frame: '24H',
        type: 'currency',
        value: data?.price_change_24h_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '1H',
        type: '%',
        value: data?.price_change_percentage_1h_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '7D',
        type: '%',
        value: data?.price_change_percentage_7d_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '14D',
        type: '%',
        value: data?.price_change_percentage_14d_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '30D',
        type: '%',
        value: data?.price_change_percentage_30d_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '60D',
        type: '%',
        value: data?.price_change_percentage_60d_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '200D',
        type: '%',
        value: data?.price_change_percentage_200d_in_currency[currency],
      },
      {
        title: 'Price Chg %',
        time_frame: '1Y',
        type: '%',
        value: data?.price_change_percentage_1y_in_currency[currency],
      },
      {
        title: 'Market Cap Chg',
        time_frame: '24H',
        type: 'currency',
        value: data?.market_cap_change_24h_in_currency[currency],
        notation: true,
      },
      {
        title: 'Market Cap Chg %',
        time_frame: '24H',
        type: '%',
        value: data?.market_cap_change_percentage_24h_in_currency[currency],
      },
    ];
  }, [data, currency, isFetching]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 flex items-center justify-between bg-card border rounded-xl p-3">
        <span className="leading-none font-semibold">Price Change</span>

        {!isFetching && (
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(data.price_change_24h_in_currency).map((key) => (
                <SelectItem key={key} value={key}>
                  {key.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {isFetching
        ? Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="px-3">
              <CardContent className="px-0 flex flex-col justify-center items-center gap-2">
                <Skeleton className="w-10 h-4" />
              </CardContent>
            </Card>
          ))
        : transformedData?.map((item, index) => (
            <Card key={index} className="px-3">
              <CardContent className="px-0 flex flex-col justify-center items-center gap-2">
                <div className="text-muted-foreground text-xs text-center">
                  {item.title}
                </div>
                {item.type === '%' ? (
                  <Percentage
                    value={item.value ?? Infinity}
                    position="justify-center"
                    text_size="text-md"
                  />
                ) : (
                  <span className="text-md">
                    {formatCurrency({
                      amount: item.value,
                      currency: currency.toUpperCase(),
                      compact: item.notation,
                    })}
                  </span>
                )}
                <div className="text-muted-foreground text-sm">
                  {item.time_frame}
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
