import { cn } from '@erp/utils';
import { ArrowRightCircle } from 'lucide-react';
import {
  useCallback,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '../../primitives/sheet';
import { MobileNav } from '../mobile-nav';
import { IconBar } from './icon-bar';
import { SubNav } from './sub-nav';
import { TopBar } from './top-bar';

export interface NavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

interface ShellLayoutProps {
  children: ReactNode;
  currentPath: string;
  brandName?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  userAvatar?: string;
  modulesEnabled?: string[];
  isDark?: boolean;
  onToggleTheme?: () => void;
  onLogout?: () => void;
  linkComponent?: ComponentType<NavLinkProps>;
}

export function ShellLayout({
  children,
  currentPath,
  brandName,
  userName,
  userRole,
  userInitials,
  userAvatar,
  modulesEnabled,
  isDark = false,
  onToggleTheme,
  onLogout,
  linkComponent,
}: ShellLayoutProps) {
  const isMobile = useIsMobile();
  const [subNavExpanded, setSubNavExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSubNav = useCallback(
    () => setSubNavExpanded((prev) => !prev),
    []
  );
  return (
    <div
      className={cn(
        'flex h-screen overflow-hidden bg-background text-foreground'
      )}
    >
      {/* Desktop sidebar group — icon bar + sub-nav + toggle */}
      <div className="relative hidden md:flex shrink-0">
        {/* Icon bar (always visible) */}
        <IconBar
          currentPath={currentPath}
          modulesEnabled={modulesEnabled}
          linkComponent={linkComponent}
        />

        {/* Sub-navigation panel — always in DOM, animates width */}
        <SubNav
          currentPath={currentPath}
          brandName={brandName}
          collapsed={!subNavExpanded}
          linkComponent={linkComponent}
        />

        {/* Toggle button — green arrow circle at right edge of sidebar group */}
        <button
          type="button"
          onClick={toggleSubNav}
          className="absolute top-19.5 -right-2.5 z-30 p-0.75  flex size-5 items-center justify-center rounded-full bg-white overflow-hidden shadow-sm transition-transform duration-300"
          aria-label={subNavExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ArrowRightCircle
            className={cn(
              'size-5 text-sidebar-primary transition-transform duration-300',
              subNavExpanded && 'rotate-180'
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Mobile sidebar (Sheet) */}
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-72 p-0 bg-sidebar">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation links
            </SheetDescription>
            <div className="flex h-full">
              <IconBar
                currentPath={currentPath}
                modulesEnabled={modulesEnabled}
                linkComponent={linkComponent}
              />
              <SubNav
                currentPath={currentPath}
                brandName={brandName}
                linkComponent={linkComponent}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-background">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav currentPath={currentPath} linkComponent={linkComponent} />
    </div>
  );
}
