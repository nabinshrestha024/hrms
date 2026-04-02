import { useEmployee, type EmployeeStatus } from '@erp/data-access';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@erp/ui';
import { formatCurrency, formatDate } from '@erp/utils';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/employees/$id')({
  component: EmployeeDetailPage,
  beforeLoad: ({ params }) => ({ breadcrumb: `Employee #${params.id}` }),
});

const statusVariantMap: Record<
  EmployeeStatus,
  'success' | 'destructive' | 'warning'
> = {
  active: 'success',
  inactive: 'destructive',
  on_leave: 'warning',
};

const statusLabelMap: Record<EmployeeStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  on_leave: 'On Leave',
};

function EmployeeDetailSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-9 w-44" />
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="ml-auto h-6 w-20 rounded-md" />
      </div>
      <Separator />
      <Skeleton className="h-9 w-80" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function EmployeeDetailPage() {
  const { id } = useParams({ from: '/_authenticated/employees/$id' });
  const { data: employee, isLoading } = useEmployee(id);

  if (isLoading) return <EmployeeDetailSkeleton />;

  if (!employee) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/employees">
            <ArrowLeft /> Back to Employees
          </Link>
        </Button>
        <p className="mt-6 text-muted-foreground">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/employees">
          <ArrowLeft /> Back to Employees
        </Link>
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-muted-foreground">
            {employee.designation} &middot; {employee.department}
          </p>
        </div>
        <Badge variant={statusVariantMap[employee.status]}>
          {statusLabelMap[employee.status]}
        </Badge>
      </div>

      <Separator />

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow label="Employee ID" value={employee.employeeId} />
              <DetailRow label="Email" value={employee.email} />
              <DetailRow
                label="Phone"
                value={employee.phone ?? 'Not provided'}
              />
              <DetailRow label="Department" value={employee.department} />
              <DetailRow label="Branch" value={employee.branch} />
              <DetailRow label="Job Level" value={employee.jobLevel} />
              <DetailRow label="Designation" value={employee.designation} />
              <DetailRow
                label="Manager ID"
                value={employee.managerId ?? 'None'}
              />
              <DetailRow
                label="Joining Date"
                value={formatDate(employee.startDate)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compensation">
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow
                label="Salary"
                value={formatCurrency(employee.salary)}
              />
              <DetailRow
                label="Start Date"
                value={formatDate(employee.startDate)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Activity timeline coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
