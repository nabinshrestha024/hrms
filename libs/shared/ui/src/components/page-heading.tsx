import type { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

/**
 * Simple page heading bar — title + optional subtitle + optional action slot.
 *
 * Use this when you need just a header (e.g. above a custom layout). For a
 * full list page with search, filter, and card/table toggle, use `<ListPage>`.
 */
export function PageHeading({
  title,
  subtitle,
  actions,
  children,
}: PageHeadingProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-[-0.1px]">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
