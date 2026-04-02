import type { ComponentType } from 'react';
import { cn } from '@erp/utils';
import { findActiveModule } from '../lib/nav-config';
import type { NavLinkProps } from './shell-layout';

interface SubNavProps {
  currentPath: string;
  brandName?: string;
  collapsed?: boolean;
  linkComponent?: ComponentType<NavLinkProps>;
}

function DefaultLink({ to, children, className }: NavLinkProps) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

export function SubNav({
  currentPath,
  brandName,
  collapsed = false,
  linkComponent,
}: SubNavProps) {
  const LinkComp = linkComponent ?? DefaultLink;
  const activeModule = findActiveModule(currentPath);

  const subItems = activeModule?.subItems;
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div
      className={cn(
        'flex flex-col bg-sidebar-primary border-r border-sidebar-border shrink-0 overflow-hidden transition-all duration-300 ease-in-out',
        collapsed || !hasSubItems ? 'w-0 border-r-0' : 'w-[200px]'
      )}
    >
      {/* Inner wrapper — fixed width so content doesn't reflow during animation */}
      <div className="flex flex-col w-[200px] min-h-0">
        {/* Brand name */}
        <div className="flex h-[44px] items-center px-3 pt-3">
          <span className="text-sm font-semibold text-sidebar-primary-foreground truncate leading-5 whitespace-nowrap">
            {brandName ?? 'HRMS'}
          </span>
        </div>

        {/* Module section label */}
        {activeModule && hasSubItems && (
          <div className="px-3.5 pt-3.5 pb-3">
            <span className="text-sm font-medium text-sidebar-primary-foreground/70 leading-5 whitespace-nowrap">
              {activeModule.label}
            </span>
          </div>
        )}

        {/* Sub-items — each with unique icon */}
        {hasSubItems && (
          <nav className="flex-1 flex flex-col">
            {subItems.map((item) => {
              const isActive =
                currentPath === item.href ||
                currentPath.startsWith(item.href + '/');
              const ItemIcon = item.icon;
              return (
                <LinkComp
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 p-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                      : 'text-sidebar-primary-foreground/70 hover:text-sidebar-primary-foreground hover:bg-sidebar-accent/50'
                  )}
                >
                  <ItemIcon className="size-5 shrink-0" strokeWidth={1.5} />
                  <span className="truncate leading-5">{item.label}</span>
                </LinkComp>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
