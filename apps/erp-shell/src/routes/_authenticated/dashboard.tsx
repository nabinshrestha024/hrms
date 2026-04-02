import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardLayout,
  beforeLoad: () => ({ breadcrumb: 'Dashboard' }),
});

function DashboardLayout() {
  return <Outlet />;
}
