'use client';

import * as React from 'react';
import Link from 'next/link';

// Icons
import {
  ChartNoAxesCombined,
  ChartPie,
  Coins,
  GitCompare,
  Info,
} from 'lucide-react';

// Components
import { NavMenu } from '@/components/app-sidebar/nav-menu';
import { Powered } from '@/components/app-sidebar/powered';

// UI
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

// Navigation menu
const nav_menu = [
  {
    title: 'Dashboard',
    url: '/',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Coin Analysis',
    url: '/coin/bitcoin',
    icon: Coins,
  },
  {
    title: 'Coin Comparison',
    url: '/coin-comparison',
    icon: GitCompare,
  },
  {
    title: 'Disclaimer',
    url: '/disclaimer',
    icon: Info,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
              asChild
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                  <Coins className="size-4 stroke-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="space-x-1">
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent font-semibold">
                      Crypto
                    </span>
                    <span className="truncate font-semibold">Lens</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={nav_menu} />
      </SidebarContent>
      <SidebarFooter>
        <Powered />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
