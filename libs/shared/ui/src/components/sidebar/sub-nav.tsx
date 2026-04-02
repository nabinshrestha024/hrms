import { cn } from '@erp/utils';
import type { ComponentType } from 'react';
import { findActiveModule } from '../../lib/nav-config';
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
        'flex flex-col bg-[#312C85] border-r border-sidebar-border shrink-0 overflow-hidden transition-all duration-300 ease-in-out',
        collapsed || !hasSubItems ? 'w-0 border-r-0' : 'w-52'
      )}
    >
      {/* Inner wrapper — fixed width so content doesn't reflow during animation */}
      <div className="flex flex-col w-52 min-h-0">
        {/* Brand name */}
        <div className="pt-5 pr-19.5 pl-3 pb-8.5 text-white text-[14px] font-semibold truncate leading-5 whitespace-nowrap">
          {brandName ?? 'HRMS'}
        </div>

        {/* Module section label */}
        {activeModule && hasSubItems && (
          <div className="px-4 pb-3 text-white text-[14px] font-medium leading-5 whitespace-nowrap">
            {activeModule.label}
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
                    'h-11 flex items-center gap-3 text-[14px] font-medium rounded-none p-3 hover:bg-[#ECECEC1A] text-white hover:text-white transition-colors overflow-hidden whitespace-nowrap',
                    isActive ? 'bg-[#ECECEC1A] text-white' : ''
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
