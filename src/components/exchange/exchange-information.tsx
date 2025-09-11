import Image from 'next/image';

// Icons
import { Globe, Info, Calendar, HandCoins, Link } from 'lucide-react';

// Types
import { ExchangeInfo } from '@/types/exchange';

// Lib
import { removeProtocol } from '@/lib/formatter';

// Components
import { TooltipWrapper } from '@/components/common';

// UI
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  data: ExchangeInfo;
  isFetching?: boolean;
};

export function ExchangeInformation({ data, isFetching }: Props) {
  return (
    <Card className="py-3">
      <CardContent className="flex items-center justify-between px-3">
        {isFetching ? (
          <>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
          </>
        ) : (
          <>
            {/* Left */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {data?.image && (
                  <Image
                    src={data?.image}
                    width={24}
                    height={24}
                    alt={data?.name}
                    className="h-6 w-6 object-contain"
                  />
                )}
                <span className="text-lg font-semibold">{data?.name}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Info className="icon-sm stroke-muted-foreground" />
                  </DialogTrigger>
                  <DialogContent className="max-h-60 lg:max-h-96 flex flex-col">
                    <DialogHeader>
                      <DialogTitle>{data?.name}</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto text-muted-foreground leading-relaxed">
                      {data?.description}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="icon-sm stroke-muted-foreground" />
                <span className="text-card-foreground text-sm">
                  {data?.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="icon-sm stroke-muted-foreground" />
                <span className="text-card-foreground text-sm">
                  {data?.year_established}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link className="icon-sm stroke-muted-foreground" />
                <a
                  href={data?.url}
                  target="_blank"
                  className="text-card-foreground text-sm"
                >
                  {removeProtocol(data?.url)}
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-2">
              <Badge variant="secondary">#{data.trust_score_rank}</Badge>
              <div className="flex items-center gap-2">
                <TooltipWrapper
                  side="bottom"
                  content={
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Coins</span>
                    </div>
                  }
                >
                  <HandCoins className="icon-sm stroke-muted-foreground" />
                </TooltipWrapper>
                <span className="text-card-foreground text-sm">
                  {data?.coins}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TooltipWrapper
                  side="bottom"
                  content={
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Pairs</span>
                    </div>
                  }
                >
                  <Calendar className="icon-sm stroke-muted-foreground" />
                </TooltipWrapper>
                <span className="text-card-foreground text-sm">
                  {data?.pairs}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
