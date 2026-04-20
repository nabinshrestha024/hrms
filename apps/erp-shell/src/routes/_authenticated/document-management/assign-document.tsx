import { createFileRoute } from '@tanstack/react-router';
import { AssignDocumentForm } from '../../../features/document-management/assign-document/assign-document-form';

export const Route = createFileRoute(
  '/_authenticated/document-management/assign-document'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Assign Document',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background flex flex-col">
      <div className="text-[20px] font-semibold leading-7 px-12 py-6">
        Assign Document
      </div>
      <div className="px-6">
        <AssignDocumentForm />
      </div>
    </div>
  );
}
