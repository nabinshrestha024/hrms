import type { ComponentType } from 'react';
import { cn } from '@erp/utils';
import { navModules, findActiveModule } from '../lib/nav-config';
import { Tooltip, TooltipTrigger, TooltipContent } from '../primitives/tooltip';
import type { NavLinkProps } from './shell-layout';

interface IconBarProps {
  currentPath: string;
  modulesEnabled?: string[];
  linkComponent?: ComponentType<NavLinkProps>;
}

function DefaultLink({ to, children, className }: NavLinkProps) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

export function IconBar({
  currentPath,
  modulesEnabled,
  linkComponent,
}: IconBarProps) {
  const LinkComp = linkComponent ?? DefaultLink;
  const activeModule = findActiveModule(currentPath);

  const filteredModules = modulesEnabled
    ? navModules.filter(
        (m) =>
          !m.modules || m.modules.some((mod) => modulesEnabled.includes(mod))
      )
    : navModules;

  return (
    <div className="relative flex flex-col w-16 bg-sidebar shrink-0">
      {/* Logo — 36px indigo square */}
      <div className="flex h-[70px] items-center justify-center px-[14px] py-[17px]">
        <div className="flex size-9 items-center justify-center rounded bg-sidebar-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="6" height="6" rx="1" fill="white" />
            <rect
              y="8"
              width="6"
              height="6"
              rx="1"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="8"
              width="6"
              height="6"
              rx="1"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="8"
              y="8"
              width="6"
              height="6"
              rx="1"
              fill="white"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Module icons — pl-12, py-36 as per Figma */}
      <nav className="flex-1 flex flex-col items-center pl-3 py-9">
        {filteredModules.map((mod) => {
          const isActive = activeModule?.id === mod.id;
          const Icon = mod.icon;

          return (
            <Tooltip key={mod.id}>
              <TooltipTrigger asChild>
                <LinkComp
                  to={mod.href}
                  className={cn(
                    'flex w-[52px] items-center justify-center gap-2 p-3 transition-colors',
                    isActive
                      ? 'bg-sidebar-accent border-l-2 border-sidebar-primary rounded-tl-sm rounded-bl-sm text-sidebar-foreground'
                      : 'text-white/40 hover:text-white/70'
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </LinkComp>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-background text-xs"
              >
                {mod.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </div>
  );
}
