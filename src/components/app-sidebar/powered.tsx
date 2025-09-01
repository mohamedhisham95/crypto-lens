import Link from 'next/link';

// Assets
import coin_gecko_logo from '@/assets/coin-gecko-logo.svg';

// UI
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';

export function Powered() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus:bg-none"
          asChild
        >
          <Link href={'https://www.coingecko.com'} target="_blank">
            <Image
              src={coin_gecko_logo}
              height={32}
              width={32}
              alt="coin-gecko"
              className="h-8 w-8 rounded-lg hover:bg-transparent"
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs">Data provided by</span>
              <span className="truncate font-semibold">CoinGecko</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
