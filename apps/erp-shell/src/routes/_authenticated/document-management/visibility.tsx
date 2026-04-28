import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const VisibilityManagement = lazy(() =>
  import(
    '../../../features/document-management/visibility/visibility-management'
  ).then((m) => ({ default: m.VisibilityManagement }))
);

export const Route = createFileRoute(
  '/_authenticated/document-management/visibility'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Visibility',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <VisibilityManagement />
      </Suspense>
    </div>
  );
}
