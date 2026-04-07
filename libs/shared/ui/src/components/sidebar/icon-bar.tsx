import { cn } from '@erp/utils';
import { LucideGalleryVerticalEnd } from 'lucide-react';
import type { ComponentType } from 'react';
import { findActiveModule, navModules } from '../../lib/nav-config';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../primitives/tooltip';
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
    <div className="relative flex flex-col w-16 bg-black shrink-0">
      {/* Logo — 36px indigo square */}
      <div className="px-3.5 py-4.25">
        <div className="p-2.5 rounded-lg bg-sidebar-primary">
          <div className="w-4 h-4">
            <LucideGalleryVerticalEnd className="text-white w-4 h-4" />
          </div>
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
                    'flex w-13 items-center justify-center gap-2 py-3 pl-3 pr-5 text-white rounded-tl-[2px] rounded-bl-[2px] hover:border-l-3 hover:border-l-sidebar-primary hover:bg-sidebar ',
                    isActive
                      ? 'border-l-3 border-l-sidebar-primary bg-sidebar-foreground'
                      : ''
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </LinkComp>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}
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
