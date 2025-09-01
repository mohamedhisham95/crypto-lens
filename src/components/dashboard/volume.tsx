'use client';

import { useState } from 'react';

// Lib
import { formatCurrency } from '@/lib/formatter';

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
  totalVolume: Record<string, number>;
};

export function Volume({ totalVolume }: Props) {
  const [currency, setCurrency] = useState('usd');

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2 font-semibold">
          24H Trading Volume
        </CardDescription>
        <CardTitle>
          {formatCurrency({
            amount: totalVolume[currency],
            currency: currency.toUpperCase(),
          })}
        </CardTitle>
        <CardAction>
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
        </CardAction>
      </CardHeader>
    </Card>
  );
}
