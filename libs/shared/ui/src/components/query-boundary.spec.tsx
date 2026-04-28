import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { QueryBoundary } from './query-boundary';

function withClient(node: React.ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{node}</QueryClientProvider>;
}

function ExplodeOnce(): React.ReactElement {
  // Always throws — exercises the error-boundary path.
  throw new Error('boom');
}

describe('QueryBoundary', () => {
  it('renders children when nothing throws or suspends', () => {
    render(
      withClient(
        <QueryBoundary>
          <div data-testid="ok">ok</div>
        </QueryBoundary>
      )
    );
    expect(screen.getByTestId('ok')).toBeInTheDocument();
  });

  it('shows the default error fallback when a child throws', () => {
    // Suppress the React error log for this test.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      withClient(
        <QueryBoundary>
          <ExplodeOnce />
        </QueryBoundary>
      )
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it('uses a custom errorFallback when provided', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      withClient(
        <QueryBoundary
          errorFallback={(error, retry) => (
            <button onClick={retry}>custom retry: {error.message}</button>
          )}
        >
          <ExplodeOnce />
        </QueryBoundary>
      )
    );
    const button = screen.getByRole('button', { name: /custom retry: boom/i });
    expect(button).toBeInTheDocument();
    // Clicking retry should not throw — internal state reset path runs.
    fireEvent.click(button);
    errorSpy.mockRestore();
  });
});

// Vitest exposes `vi` globally when configured; the import below is a
// no-op declaration so this file type-checks under strict TS.
declare const vi: typeof import('vitest').vi;
