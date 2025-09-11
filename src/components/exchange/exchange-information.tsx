// Types
import { ExchangeInfo } from '@/types/exchange';

// Components
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Info } from 'lucide-react';

type Props = {
  data: ExchangeInfo;
  isFetching?: boolean;
};

export function ExchangeInformation({ data, isFetching }: Props) {
  return (
    <Card className="py-3 h-[88px]">
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
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">#{data?.trust_score_rank}</Badge>
              <Badge variant="secondary" className="uppercase">
                {data?.trust_score}/10
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Info className="icon-sm stroke-muted-foreground" />
                </DialogTrigger>
                <DialogContent className="max-h-48 lg:max-h-64 overflow-auto">
                  <DialogHeader>
                    <DialogTitle>{data?.name}</DialogTitle>
                    <DialogDescription>{data?.description}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
