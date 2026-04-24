import { createFileRoute } from '@tanstack/react-router';
import { GeneratePayroll } from '../../../features/payroll/generate-payroll/generate-payroll';

export const Route = createFileRoute('/_authenticated/payroll/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Payroll Management',
    subbreadcrumb: 'Generate Payroll',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">
        Generate Payroll
      </div>
      <GeneratePayroll />
    </div>
  );
}
