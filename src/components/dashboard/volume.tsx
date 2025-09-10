'use client';

import React, { useState } from 'react';

// Icons
import { Info } from 'lucide-react';

// Lib
import { formatCurrency } from '@/lib/formatter';

// Config
import { refetch_interval } from '@/config/refetch-interval';

// Components
import { PriceCountUp, TooltipWrapper } from '@/components/common';

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
  totalVolume: Record<string, number>;
  isFetching?: boolean;
};

export const Volume = React.memo(function Volume({
  totalVolume,
  isFetching = false,
}: Props) {
  // Local State
  const [currency, setCurrency] = useState('usd');

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2 font-semibold">
          <span>24H Trading Volume</span>
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
        </CardDescription>
        <CardTitle>
          {isFetching ? (
            <Skeleton className="w-20 h-6" />
          ) : (
            <div className="flex items-center gap-4">
              <PriceCountUp
                value={totalVolume[currency]}
                currency={currency.toUpperCase()}
              />
              <TooltipWrapper
                side="bottom"
                content={formatCurrency({
                  amount: totalVolume[currency],
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
                {Object.keys(totalVolume).map((key) => (
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
