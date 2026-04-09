import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/employee/assign-approval/$id'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/employee/assign-approval/$id"!</div>;
}
