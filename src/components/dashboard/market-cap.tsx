'use client';

import React, { useState } from 'react';

// Icons
import { Info } from 'lucide-react';

// Lib
import { formatCurrency } from '@/lib/formatter';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { Percentage, PriceCountUp, TooltipWrapper } from '@/components/common';

// UI
import {
  Card,
  CardAction,
  CardDescription,
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
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  totalMarketCap: Record<string, number>;
  chgPercentage24h: number;
  isFetching?: boolean;
};

export const MarketCap = React.memo(function MarketCap({
  totalMarketCap,
  chgPercentage24h,
  isFetching = false,
}: Props) {
  // Local State
  const [currency, setCurrency] = useState('usd');

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <span className="font-semibold">Market Cap</span>
          {isFetching ? (
            <Skeleton className="w-20 h-6" />
          ) : (
            <>
              <span className="text-base">
                <Percentage
                  value={chgPercentage24h}
                  decimals={2}
                  position="justify-start"
                />
              </span>
              <TooltipWrapper
                side="bottom"
                content={
                  <div className="flex items-center gap-1">
                    <span className="text-xs">Cache / Update Frequency:</span>
                    <span className="text-xs">
                      {refetch_interval['global_data'] / (60 * 1000)} Minutes
                    </span>
                  </div>
                }
              >
                <Info className="icon-sm stroke-muted-foreground" />
              </TooltipWrapper>
            </>
          )}
        </CardDescription>
        <CardTitle>
          {isFetching ? (
            <Skeleton className="w-20 h-6" />
          ) : (
            <div className="flex items-center gap-4">
              <PriceCountUp
                value={totalMarketCap[currency]}
                currency={currency.toUpperCase()}
              />
              <TooltipWrapper
                side="bottom"
                content={formatCurrency({
                  amount: totalMarketCap[currency],
                  compact: true,
                })}
              >
                <Info className="icon-sm stroke-muted-foreground" />
              </TooltipWrapper>
            </div>
          )}
        </CardTitle>
        <CardAction>
          {!isFetching && (
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-[80px]" size="sm">
                <SelectValue placeholder="Coin" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(totalMarketCap).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
});
