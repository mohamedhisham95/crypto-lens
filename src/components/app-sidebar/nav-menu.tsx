import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import {
  ArrowRightLeft,
  ChartNoAxesCombined,
  Coins,
  GitCompare,
  HandCoins,
  Info,
  Layers,
} from 'lucide-react';

// Ui
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const nav_menu = [
  {
    title: 'Dashboard',
    url: '/dashboard',
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
    icon: ArrowRightLeft,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Layers,
  },
  {
    title: 'Disclaimer',
    url: '/disclaimer',
    icon: Info,
  },
];

export function NavMenu() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

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
                onClick={() => setOpenMobile(false)}
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
