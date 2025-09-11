import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import {
  ChartNoAxesCombined,
  Coins,
  GitCompare,
  HandCoins,
  Info,
} from 'lucide-react';

// Ui
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const nav_menu = [
  {
    title: 'Dashboard',
    url: '/',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Coins',
    url: '/coins',
    icon: HandCoins,
  },
  {
    title: 'Coin Analysis',
    url: '/coin-analysis/bitcoin',
    icon: Coins,
  },
  {
    title: 'Coin Comparison',
    url: '/coin-comparison',
    icon: GitCompare,
  },
  {
    title: 'Exchanges',
    url: '/exchanges',
    icon: HandCoins,
  },
  {
    title: 'Disclaimer',
    url: '/disclaimer',
    icon: Info,
  },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {nav_menu.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={
                item.title === 'Coin Analysis'
                  ? pathname.includes('/coin-analysis/')
                  : item.url === pathname
              }
            >
              <Link
                href={item.url}
                prefetch={
                  [
                    'Coins',
                    'Coin Analysis',
                    'Coin Comparison',
                    'Exchanges',
                  ].includes(item.title)
                    ? false
                    : true
                }
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
