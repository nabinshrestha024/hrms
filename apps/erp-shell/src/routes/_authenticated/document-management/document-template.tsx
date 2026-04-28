import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const DocumentTemplate = lazy(() =>
  import(
    '../../../features/document-management/document-template/document-template'
  ).then((m) => ({ default: m.DocumentTemplate }))
);

export const Route = createFileRoute(
  '/_authenticated/document-management/document-template'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Document Template',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <DocumentTemplate />
      </Suspense>
    </div>
  );
}
