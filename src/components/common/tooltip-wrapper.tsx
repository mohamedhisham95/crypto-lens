'use client';

import { ReactNode } from 'react';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export function TooltipWrapper(props: Props) {
  if (!props.content) return props.children;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side} className="max-w-72">
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
