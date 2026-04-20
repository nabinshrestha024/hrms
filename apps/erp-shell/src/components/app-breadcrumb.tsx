import { useMatches, Link } from '@tanstack/react-router';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@erp/ui';

interface CrumbItem {
  label: string;
  path: string;
  sublabel?: string;
}

export function AppBreadcrumb() {
  const matches = useMatches();

  const crumbs: CrumbItem[] = matches
    .filter((match) => {
      const ctx = match.context as Record<string, unknown> | undefined;
      return ctx?.breadcrumb && typeof ctx.breadcrumb === 'string';
    })
    .map((match) => {
      const ctx = match.context as Record<string, unknown>;
      return {
        label: ctx.breadcrumb as string,
        sublabel: ctx.subbreadcrumb as string,
        path: match.pathname,
      };
    });

  if (crumbs.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <BreadcrumbItem key={crumb.path}>
              {isLast ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  <span className="text-secondary-foreground cursor-pointer hover:text-foreground">
                    {crumb.label}
                  </span>
                  <BreadcrumbSeparator />
                  {crumb.sublabel && (
                    <span className="text-foreground"> {crumb.sublabel}</span>
                  )}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
