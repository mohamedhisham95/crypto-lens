'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

// Lib
import { cn } from '@/lib/utils';
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
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

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
      <Card className="px-1.5">
        <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <CardTitle>Categories</CardTitle>
          <CardAction>
            <Select value={order} onValueChange={handleOrderBy}>
              <SelectTrigger className="w-full" size="sm">
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
          </CardAction>
        </CardHeader>
      </Card>

      {isFetching
        ? Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-10" />
          ))
        : data?.success
        ? data.categories
            ?.slice(0, 10)
            .map((category, index) => (
              <Card key={index} className="px-1.5"></Card>
            ))
        : null}
    </div>
  );
}
