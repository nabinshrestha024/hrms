import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const ProfileHeader = lazy(() =>
  import('../../../features/profile/profile-header').then((m) => ({
    default: m.ProfileHeader,
  }))
);

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
  beforeLoad: () => ({ subbreadcrumb: 'My Profile' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Profile" className="bg-background">
      <Suspense fallback={null}>
        <ProfileHeader />
      </Suspense>
    </ContentShell>
  );
}
