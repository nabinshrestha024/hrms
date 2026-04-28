import { useEmployee } from '@erp/data-access';
import { lazy, Suspense } from 'react';
import { HRCard } from '@erp/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Dot } from 'lucide-react';

const AssignApproval = lazy(() =>
  import('../../../features/employee/assign-approval/assign-approval-tab').then(
    (m) => ({ default: m.AssignApproval })
  )
);

export const Route = createFileRoute(
  '/_authenticated/employee/assign-approval/$id'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Assign Approval' }),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: employee } = useEmployee(id);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <>
      <div className="w-full  max-h-[calc(100vh-84px)] overflow-auto flex flex-col  bg-background ">
        <div
          className="flex gap-1 cursor-pointer px-12 pt-6 items-center"
          onClick={() => navigate({ to: '/employee' })}
        >
          <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
          <span className="text-[14px] text-secondary-foreground font-normal leading-5">
            Back
          </span>
        </div>

        <HRCard
          cardClassName="w-full  py-6 px-12 bg-background border-none  rounded-none shadow-none"
          cardContentClassName="p-0"
        >
          <div className="flex gap-3">
            <div className="w-12 h-12">
              <img
                src="/Image.png"
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {employee.firstName}
                {''}
                {employee.lastName}
              </span>

              <div className="flex items-center">
                <span>{employee.employeeId}</span>
                <Dot className="text-[16px]" />
                <span>{employee.designation}</span>
              </div>
            </div>
          </div>
        </HRCard>
        <div className="px-6">
          <HRCard
            cardClassName="w-full p-6 bg-white border-none rounded-xl shadow-none"
            cardContentClassName="p-0 flex flex-col gap-8"
          >
            <Suspense fallback={null}>
              <AssignApproval employeeId={id} />
            </Suspense>
          </HRCard>
        </div>
      </div>
    </>
  );
}
