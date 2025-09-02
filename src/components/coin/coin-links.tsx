import React from 'react';

// Lib
import { removeProtocol } from '@/lib/formatter';

// Types
import { Links } from '@/types/coin';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import Link from 'next/link';

type Props = {
  title: string;
  data: Links;
  className?: string;
};

export function CoinLinks({ title, data, className }: Props) {
  return (
    <Card className={`px-3 ${className}`}>
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableBody>
            <TableRow className="bg-muted/50">
              <TableCell>Website</TableCell>
              <TableCell className="text-right">
                {data?.homepage[0] ? (
                  <Link href={data?.homepage[0]} target="_blank">
                    <Badge variant="secondary">
                      {removeProtocol(data?.homepage[0])}
                    </Badge>
                  </Link>
                ) : (
                  <Badge
                    variant="secondary"
                    className="pointer-events-none opacity-50"
                  >
                    -
                  </Badge>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Official Forum</TableHead>
              <TableCell className="text-right">
                {data?.official_forum_url?.[0] ? (
                  <Link href={data.official_forum_url[0]} target="_blank">
                    <Badge variant="secondary">
                      {removeProtocol(data.official_forum_url[0])}
                    </Badge>
                  </Link>
                ) : (
                  <Badge
                    variant="secondary"
                    className="pointer-events-none opacity-50"
                  >
                    -
                  </Badge>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableCell>Redit</TableCell>
              <TableCell className="text-right">
                {data?.subreddit_url ? (
                  <Link href={data.subreddit_url} target="_blank">
                    <Badge variant="secondary">
                      {removeProtocol(data.subreddit_url)}
                    </Badge>
                  </Link>
                ) : (
                  <Badge
                    variant="secondary"
                    className="pointer-events-none opacity-50"
                  >
                    -
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
