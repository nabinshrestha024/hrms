import { type ReactNode } from 'react';
import { cn } from '@erp/utils';

export interface ContentShellProps {
  /**
   * Page title shown in the header bar. Omit when the children include
   * their own titled component (e.g. `<ListPage>` already renders a title).
   */
  title?: string;
  /** Optional subtitle / description rendered under the title. */
  subtitle?: ReactNode;
  /**
   * Optional element rendered at the right side of the title bar
   * (e.g. an action button). Ignored when `title` is omitted.
   */
  action?: ReactNode;
  /**
   * Apply the inner padded card wrapper (white background, rounded corners,
   * standard padding) around `children`. Useful for settings/detail pages
   * that don't have their own card. Default: `false` because list pages
   * supply their own card chrome.
   */
  padded?: boolean;
  /** Extra classes for the outer scroll container. */
  className?: string;
  children: ReactNode;
}

/**
 * Standard viewport shell for authenticated content pages.
 *
 * Replaces the duplicated boilerplate that 21 routes used to inline:
 *
 * ```tsx
 * <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-muted">
 *   <div className="px-12 py-6 text-[20px] font-semibold leading-12 text-foreground">
 *     {title}
 *   </div>
 *   <div className="px-6 pt-0 pb-32.5">
 *     <HRCard ...><Content /></HRCard>
 *   </div>
 * </div>
 * ```
 *
 * Usage:
 * ```tsx
 * // Title-less (children supply their own titled component, e.g. ListPage)
 * <ContentShell><EmployeeManagement /></ContentShell>
 *
 * // Titled, padded inner card
 * <ContentShell title="My Attendance" padded>
 *   <MyAttendanceDetails />
 * </ContentShell>
 * ```
 *
 * Uses design tokens (`bg-muted`, `text-foreground`, etc.) so tenant theme
 * overrides apply.
 */
export function ContentShell({
  title,
  subtitle,
  action,
  padded = false,
  className,
  children,
}: ContentShellProps) {
  return (
    <div
      className={cn(
        // `max-h-` (not `h-`) so short pages collapse to content size
        // instead of leaving an awkward viewport-height empty area below.
        'w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col ',
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-start gap-4 px-12 py-6">
          <div className="flex flex-col">
            <span className="text-[20px] font-semibold leading-12 text-foreground">
              {title}
            </span>
            {subtitle && (
              <span className="text-[14px] font-normal leading-5 text-muted-foreground">
                {subtitle}
              </span>
            )}
          </div>
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}

      {padded ? (
        <div className="px-6 pt-0 pb-32.5">
          <div className="bg-background rounded-xl p-6">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
