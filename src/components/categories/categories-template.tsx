'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import dayjs from 'dayjs';

// Icons
import { Info } from 'lucide-react';

// Lib
import { formatCurrency } from '@/lib/formatter';
import { apiFetcher } from '@/lib/api-fetcher';

// Types
import type { CategoryResponse } from '@/types/categories';

// Components
import { AlertMessage, Percentage, TooltipWrapper } from '@/components/common';

// UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const order_by_list = [
  {
    label: 'Market Cap ASC',
    value: 'market_cap_asc',
  },
  {
    label: 'Market Cap DESC',
    value: 'market_cap_desc',
  },
  {
    label: 'Name ASC',
    value: 'name_asc',
  },
  {
    label: 'Name DESC',
    value: 'name_desc',
  },
  {
    label: 'Market Cap Change 24H ASC',
    value: 'market_cap_change_24h_asc',
  },
  {
    label: 'Market Cap Change 24H DESC',
    value: 'market_cap_change_24h_desc',
  },
];

export function CategoriesTemplate() {
  // Local State
  const [order, setOrder] = useState('market_cap_desc');

  // Categories
  const { data, isFetching, isError, error } = useQuery<CategoryResponse>({
    queryKey: ['categories', order],
    queryFn: () =>
      apiFetcher(`/categories`, {
        order,
      }),
  });

  console.log('data :: ', data);

  // Handle Order By
  const handleOrderBy = (orderBy: string) => {
    setOrder(orderBy);
  };

  // Error UI
  if (isError) {
    return <AlertMessage message={error.message} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-3">
        <div className="text-lg font-semibold leading-none">Categories</div>
        <Select value={order} onValueChange={handleOrderBy}>
          <SelectTrigger className="w-fit" size="sm">
            <SelectValue placeholder="Coin" />
          </SelectTrigger>
          <SelectContent>
            {order_by_list.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isFetching
        ? Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-10" />
          ))
        : data?.success
        ? data.categories?.slice(0, 10).map((category, index) => (
            <Card
              key={index}
              className="p-4 flex flex-row items-start justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-sm">{category.name}</span>
                  {category.content && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Info className="icon-sm stroke-muted-foreground" />
                      </DialogTrigger>
                      <DialogContent className="max-h-48 lg:max-h-64 overflow-auto">
                        <DialogHeader>
                          <DialogTitle>{category.name}</DialogTitle>
                          <DialogDescription>
                            {category.content}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <TooltipWrapper
                    side="bottom"
                    content={formatCurrency({
                      amount: category.market_cap,
                      compact: true,
                    })}
                  >
                    <span>
                      {formatCurrency({
                        amount: category.market_cap,
                      })}
                    </span>
                  </TooltipWrapper>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    Market Cap Chg %:
                  </span>
                  <Percentage
                    value={category?.market_cap_change_24h ?? Infinity}
                  />
                  <span className="text-muted-foreground !text-xs">(24H)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Volume 24H:</span>
                  <TooltipWrapper
                    side="bottom"
                    content={formatCurrency({
                      amount: category.market_cap,
                      compact: true,
                    })}
                  >
                    <span>
                      {formatCurrency({
                        amount: category.volume_24h,
                      })}
                    </span>
                  </TooltipWrapper>
                </div>

                {category.top_3_coins_id.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Top Coins:</span>
                    <div className="flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
                      {category.top_3_coins.map((item, index) => (
                        <Link
                          key={index}
                          target="_blank"
                          href={`/coin/${category.top_3_coins_id[index]}`}
                          prefetch={false}
                        >
                          <Avatar>
                            <AvatarImage
                              src={item}
                              alt={category.top_3_coins_id[index]}
                            />
                            <AvatarFallback>
                              {item.slice(0, 1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>
                  {dayjs(category.updated_at).format('DD MMM YYYY HH:mm')}
                </span>
              </div>
            </Card>
          ))
        : null}
    </div>
  );
}
