import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { type LucideIcon } from 'lucide-react';

// Ui
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMenu({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
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
                  ['Coins', 'Coin Analysis', 'Coin Comparison'].includes(
                    item.title
                  )
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
