import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const MissingDocumnetManagement = lazy(() =>
  import(
    '../../../features/document-management/missing-document/missing-documnet-management'
  ).then((m) => ({ default: m.MissingDocumnetManagement }))
);

export const Route = createFileRoute('/_authenticated/document-management/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Missing Document',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <MissingDocumnetManagement />
      </Suspense>
    </div>
  );
}
