'use client';

import { useState } from 'react';

// Icons
import { Info } from 'lucide-react';

// Lib
import { formatCurrency } from '@/lib/formatter';

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

type Props = {
  totalMarketCap: Record<string, number>;
  chgPercentage24h: number;
};

export function MarketCap({ totalMarketCap, chgPercentage24h }: Props) {
  // Local State
  const [currency, setCurrency] = useState('usd');

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <span className="font-semibold">Market Cap</span>
          <span className="text-base">
            <Percentage
              value={chgPercentage24h}
              decimals={2}
              position="justify-start"
            />
          </span>
        </CardDescription>
        <CardTitle>
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
              <Info className="icon-sm" />
            </TooltipWrapper>
          </div>
        </CardTitle>
        <CardAction>
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
        </CardAction>
      </CardHeader>
    </Card>
  );
}
