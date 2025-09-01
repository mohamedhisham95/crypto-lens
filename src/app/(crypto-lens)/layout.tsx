import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Assets
import coin_gecko_powered_by_banner from '@/assets/coin_gecko_powered_by_banner.svg';

// Components
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeModeToggle, BreadCrumbHeader } from '@/components/common';

// UI
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col gap-3 px-2">
        <header
          // className="flex h-16 shrink-0 items-center justify-between gap-2"
          className="flex h-16 shrink-0 items-center justify-between gap-2 sticky top-0 z-50 bg-background"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadCrumbHeader />
          </div>
          <ThemeModeToggle />
        </header>
        <main className="p-2 lg:p-4 h-[calc(100%-64px)] z-10">{children}</main>
        <footer className="flex shrink-0 items-center justify-end border-t bg-background p-2 lg:p-4">
          <Link href={'https://www.coingecko.com/en/api/'} target="_blank">
            <Image
              src={coin_gecko_powered_by_banner}
              width={176}
              height={64}
              alt="coin-gecko"
              className="w-44 h-16 object-contain"
            />
          </Link>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
