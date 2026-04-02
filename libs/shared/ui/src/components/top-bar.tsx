import { useState, useEffect } from 'react';
import { Bell, ChevronsUpDown, Menu, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../primitives/button';
import { Avatar, AvatarFallback, AvatarImage } from '../primitives/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu';

interface TopBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onMobileMenuToggle: () => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopBar({
  isDark,
  onToggleTheme,
  onMobileMenuToggle,
  userName,
  userRole,
  userInitials,
  userAvatar,
  onLogout,
}: TopBarProps) {
  const now = useCurrentTime();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <header className="flex h-[70px] items-center justify-between bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-6 md:px-12 dark:bg-card dark:shadow-none dark:border-b dark:border-border">
      {/* Left: mobile menu button / Clock In on desktop */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Clock In button — indigo text, default border, pill shape */}
        <button
          type="button"
          className="hidden md:flex items-center gap-2 rounded-full border border-border h-10 px-4 text-sm font-medium text-[#4F39F6] hover:bg-[#4F39F6]/5 transition-colors"
        >
          <span>Clock In</span>
          <span className="font-semibold">{timeStr}</span>
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2.5">
        {/* Notifications — outlined circle */}
        <button
          type="button"
          className="relative flex size-[29px] items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </button>

        {/* User dropdown — light gray bg, rounded-sm */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded bg-[#FAFAFA] px-2 py-1.5 hover:bg-accent transition-colors dark:bg-muted"
            >
              <Avatar className="size-8 rounded-lg">
                {userAvatar && <AvatarImage src={userAvatar} alt={userName} className="rounded-lg" />}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs rounded-lg">
                  {userInitials ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-sm font-semibold leading-5 text-[#3F3F46] dark:text-foreground">{userName ?? 'User'}</span>
                <span className="text-xs font-normal leading-4 text-[#71717A] dark:text-muted-foreground">{userRole ?? ''}</span>
              </div>
              <ChevronsUpDown className="hidden md:block size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{userName ?? 'My Account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleTheme}>
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
