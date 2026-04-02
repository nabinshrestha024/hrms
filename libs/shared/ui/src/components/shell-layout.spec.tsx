import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShellLayout } from './shell-layout';

// Mock window.matchMedia (not available in jsdom)
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('ShellLayout', () => {
  it('renders children in the main content area', () => {
    render(
      <ShellLayout currentPath="/dashboard">
        <div data-testid="page-content">Dashboard Content</div>
      </ShellLayout>
    );
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  it('renders the brand name in the sub-nav when module has sub-items', () => {
    render(
      <ShellLayout currentPath="/leave/requests">
        <div>Content</div>
      </ShellLayout>
    );
    expect(screen.getByText('HRMS')).toBeInTheDocument();
  });

  it('renders custom brand name when provided', () => {
    render(
      <ShellLayout currentPath="/leave/requests" brandName="Acme Corp">
        <div>Content</div>
      </ShellLayout>
    );
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders the Clock In button', () => {
    render(
      <ShellLayout currentPath="/dashboard">
        <div>Content</div>
      </ShellLayout>
    );
    expect(screen.getByText('Clock In')).toBeInTheDocument();
  });

  it('renders the sidebar toggle button', () => {
    render(
      <ShellLayout currentPath="/dashboard">
        <div>Content</div>
      </ShellLayout>
    );
    expect(
      screen.getByRole('button', { name: /collapse sidebar|expand sidebar/i })
    ).toBeInTheDocument();
  });

  it('renders user name when provided', () => {
    render(
      <ShellLayout
        currentPath="/dashboard"
        userName="John Doe"
        userRole="Admin"
      >
        <div>Content</div>
      </ShellLayout>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
