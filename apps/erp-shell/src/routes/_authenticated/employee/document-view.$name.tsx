import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { personalDocumentData } from '../../../features/employee/Schema/DocumentData';
import { ArrowLeft, Dot } from 'lucide-react';
import { HRCard } from '@erp/ui';
import { TemplateView } from '../../../features/employee/employe-details/document/templete-view';
import { FileView } from '../../../features/employee/employe-details/document/file-view';

export const Route = createFileRoute(
  '/_authenticated/employee/document-view/$name'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Document View' }),
});

function RouteComponent() {
  const { name } = Route.useParams();
  const navigate = useNavigate();
  const document = personalDocumentData.find(
    (doc) => doc.templateName === name
  );

  if (!document) {
    return <div>Document not found</div>;
  }
  return (
    <>
      <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background">
        <div
          className="flex gap-1 cursor-pointer px-12 pt-6 items-center"
          onClick={() => navigate({ to: `/employee` })}
        >
          <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
          <span className="text-[14px] text-secondary-foreground font-normal leading-5">
            Back
          </span>
        </div>
        <div className="flex flex-col gap-1 px-12 py-6">
          <span className="flex items-center text-[16px] text-secondary-foreground leading-6 font-medium">
            Category{''}
            <Dot className="w-4 h-4 text-secondary-foreground" />
            {''}
            {document.templateName}
          </span>
          <span className="text-[20px] text-foreground leading-7 font-semibold">
            Document Name
          </span>
        </div>
        <div className="px-6 pt-0 pb-8">
          <HRCard
            cardClassName="p-6 rounded-[8px] shadow-none border-none bg-white"
            cardContentClassName="p-0 flex flex-col gap-8"
          >
            {document.templateName === 'Template' ? (
              <TemplateView />
            ) : (
              <FileView />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-foreground leading-5 font-medium">
                Note for Employee
              </span>
              <HRCard
                cardClassName="px-3 py-2.5 rounded-[6px] shadow-none border border-border bg-muted"
                cardContentClassName="p-0 "
              >
                <span className="text-[14px] text-foreground leading-5 font-normal">
                  This is test Note for employee
                </span>
              </HRCard>
            </div>
          </HRCard>
        </div>
      </div>
    </>
  );
}
