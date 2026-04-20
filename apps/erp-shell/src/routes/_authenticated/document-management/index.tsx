import { createFileRoute } from '@tanstack/react-router';
import { MissingDocumnetManagement } from '../../../features/document-management/missing-document/missing-documnet-management';

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
      <MissingDocumnetManagement />
    </div>
  );
}
