import { cn } from '@erp/utils';
import { ChartPie, FileCog, TentTree, UserCog, Users } from 'lucide-react';
import { type ComponentType } from 'react';
import type { NavLinkProps } from './sidebar/shell-layout';

const mobileNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: ChartPie },
  { label: 'Employees', href: '/employee', icon: UserCog },
  { label: 'Leave', href: '/leave/requests', icon: TentTree },
  { label: 'Attendance', href: '/attendance', icon: Users },
  { label: 'Settings', href: '/settings', icon: FileCog },
];

interface MobileNavProps {
  currentPath: string;
  linkComponent?: ComponentType<NavLinkProps>;
}

function DefaultLink({ to, children, className }: NavLinkProps) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

export function MobileNav({ currentPath, linkComponent }: MobileNavProps) {
  const LinkComp = linkComponent ?? DefaultLink;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card md:hidden">
      {mobileNavItems.map((item) => {
        const isActive =
          currentPath === item.href ||
          currentPath.startsWith(
            item.href.split('/').slice(0, 2).join('/') + '/'
          );
        const Icon = item.icon;

        return (
          <LinkComp
            key={item.href}
            to={item.href}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </LinkComp>
        );
      })}
    </nav>
  );
}
