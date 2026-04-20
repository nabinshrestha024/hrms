import { createFileRoute } from '@tanstack/react-router';
import { DocumentTemplate } from '../../../features/document-management/document-template/document-template';

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
      <DocumentTemplate />
    </div>
  );
}
