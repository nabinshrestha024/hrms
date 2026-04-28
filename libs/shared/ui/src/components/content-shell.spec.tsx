import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContentShell } from './content-shell';

describe('ContentShell', () => {
  it('renders children', () => {
    render(
      <ContentShell>
        <div data-testid="content">hi</div>
      </ContentShell>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('omits the title bar when no title is provided', () => {
    render(
      <ContentShell>
        <div>x</div>
      </ContentShell>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <ContentShell title="My Page" subtitle="A description">
        <div>x</div>
      </ContentShell>
    );
    expect(screen.getByText('My Page')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('renders the action only when title is also provided', () => {
    const { rerender } = render(
      <ContentShell action={<button>Add</button>}>
        <div>x</div>
      </ContentShell>
    );
    // Without title, the title-bar (and action slot) is not rendered.
    expect(
      screen.queryByRole('button', { name: 'Add' })
    ).not.toBeInTheDocument();

    rerender(
      <ContentShell title="My Page" action={<button>Add</button>}>
        <div>x</div>
      </ContentShell>
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('wraps children in a padded card when padded=true', () => {
    render(
      <ContentShell padded>
        <div data-testid="content">x</div>
      </ContentShell>
    );
    const content = screen.getByTestId('content');
    // Padded wrapper has bg-background + rounded-xl on the parent of children.
    expect(content.parentElement?.className).toMatch(/bg-background/);
  });
});
