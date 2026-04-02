import { render, screen } from '@testing-library/react';
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  createMemoryHistory,
} from '@tanstack/react-router';

describe('App', () => {
  it('should render the dashboard route', async () => {
    const rootRoute = createRootRoute();
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/dashboard',
      component: () => <div>Dashboard</div>,
    });
    rootRoute.addChildren([dashboardRoute]);

    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ['/dashboard'] }),
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText('Dashboard')).toBeTruthy();
  });
});
