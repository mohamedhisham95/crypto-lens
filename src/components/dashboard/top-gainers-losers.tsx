import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Lib
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatter';

// Types
import { CoinList } from '@/types/coin';

// Common
import { Percentage, TooltipWrapper } from '@/components/common';

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
  data: CoinList[];
};

export function TopGainersLosers({ title, data = [] }: Props) {
  return (
    <Card className="px-0">
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
                Volume
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Chg %
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((coin, index) => (
              <TableRow
                key={index}
                className={cn(index % 2 !== 0 && 'bg-muted/50')}
              >
                <TableCell className="text-muted-foreground">
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell>
                  <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Image
                        src={coin.image}
                        width={24}
                        height={24}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      <span className="truncate">{coin.name}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <TooltipWrapper
                    side="bottom"
                    content={formatCurrency({
                      amount: coin.total_volume,
                      compact: true,
                    })}
                  >
                    <div className="flex justify-end cursor-pointer">
                      {formatCurrency({
                        amount: coin.total_volume,
                      })}
                    </div>
                  </TooltipWrapper>
                </TableCell>
                <TableCell>
                  <Percentage
                    value={coin.price_change_percentage_24h}
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
