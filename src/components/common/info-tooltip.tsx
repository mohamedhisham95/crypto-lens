'use client';

import { ReactNode } from 'react';

// Hooks
import { useIsMobile } from '@/hooks/use-mobile';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export function InfoTooltip({ children, content, side = 'bottom' }: Props) {
  const isMobile = useIsMobile();

  if (!content) return <>{children}</>;

  if (isMobile) {
    // 👉 Mobile = Popover (click to open, stays until tap outside)
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          side={side}
          className="max-w-72 bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance"
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  // 👉 Desktop = Tooltip (hover/focus)
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="max-w-72">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
