import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';

// Types
import type { TrendingCoins } from '@/types/dashboard';

// Common
import { Percentage } from '@/components/common';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  title: string;
  data: TrendingCoins[];
  className?: string;
};

export function TrendingCoins({ title, data = [], className = '' }: Props) {
  return (
    <Card className={`px-0 ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table className="overflow-auto">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">
                #
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Price
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Market Cap
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Chg % (24H)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ item }, index) => (
              <TableRow
                key={index}
                className={cn(index % 2 !== 0 && 'bg-muted/50')}
              >
                <TableCell className="text-muted-foreground">
                  {item.market_cap_rank}
                </TableCell>
                <TableCell>
                  <Link href={`/coin/${item.id}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Image
                        src={item.large}
                        width={24}
                        height={24}
                        alt={item.name}
                        className="w-6 h-6"
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency({
                    amount: item?.data?.price,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {item?.data?.market_cap}
                </TableCell>
                <TableCell>
                  <Percentage
                    value={item.data?.price_change_percentage_24h['usd']}
                    decimals={3}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
