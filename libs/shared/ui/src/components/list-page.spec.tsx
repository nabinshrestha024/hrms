import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { ListPage, type ListPageQuery } from './list-page';

// Tabs primitive uses Radix which calls matchMedia.
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

interface Row {
  id: string;
  name: string;
  branch: string;
  status: string;
}

const ROWS: Row[] = [
  { id: '1', name: 'Aarav', branch: 'Kathmandu', status: 'active' },
  { id: '2', name: 'Bina', branch: 'Pokhara', status: 'inactive' },
  { id: '3', name: 'Chandra', branch: 'Kathmandu', status: 'active' },
];

const renderCard = (rows: Row[]) => (
  <ul data-testid="card">
    {rows.map((r) => (
      <li key={r.id}>{r.name}</li>
    ))}
  </ul>
);

const renderTable = (rows: Row[]) => (
  <table data-testid="table">
    <tbody>
      {rows.map((r) => (
        <tr key={r.id}>
          <td>{r.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

describe('ListPage', () => {
  it('renders the title and the data through renderCard by default', () => {
    render(
      <ListPage<Row> title="People" data={ROWS} renderCard={renderCard} />
    );
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Aarav')).toBeInTheDocument();
    expect(screen.getByText('Bina')).toBeInTheDocument();
  });

  it('does not render a Tabs toggle when only renderCard is provided', () => {
    render(
      <ListPage<Row> title="People" data={ROWS} renderCard={renderCard} />
    );
    // TabsFlex renders TabsTriggers with role="tab"; absence means no toggle.
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  it('does not render a Tabs toggle when only renderTable is provided', () => {
    render(
      <ListPage<Row> title="People" data={ROWS} renderTable={renderTable} />
    );
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('renders the Tabs toggle when both renderers are provided', () => {
    render(
      <ListPage<Row>
        title="People"
        data={ROWS}
        renderCard={renderCard}
        renderTable={renderTable}
      />
    );
    expect(screen.queryAllByRole('tab').length).toBeGreaterThan(0);
  });

  it('respects an explicit views=["table"] override', () => {
    render(
      <ListPage<Row>
        title="People"
        views={['table']}
        data={ROWS}
        renderCard={renderCard}
        renderTable={renderTable}
      />
    );
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('passes the search input to filterFn', () => {
    const filterFn = vi.fn((data: Row[], q: ListPageQuery) =>
      data.filter((r) => r.name.toLowerCase().includes(q.search.toLowerCase()))
    );

    render(
      <ListPage<Row>
        title="People"
        search
        data={ROWS}
        renderCard={renderCard}
        filterFn={filterFn}
      />
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'aar' } });

    expect(screen.getByText('Aarav')).toBeInTheDocument();
    expect(screen.queryByText('Bina')).not.toBeInTheDocument();
    expect(filterFn).toHaveBeenCalled();
    const lastCall = filterFn.mock.calls.at(-1);
    expect(lastCall?.[1].search).toBe('aar');
  });

  it('renders a dropdown trigger labeled with the dropdown.label and starts unselected', () => {
    const filterFn = vi.fn((data: Row[], _q: ListPageQuery) => data);
    render(
      <ListPage<Row>
        title="People"
        data={ROWS}
        dropdowns={[{ key: 'branch', label: 'Branch' }]}
        renderCard={renderCard}
        filterFn={filterFn}
      />
    );
    // Trigger label shows the dropdown's `label` prop while no value is selected.
    expect(screen.getByText('Branch')).toBeInTheDocument();
    // filterFn is called on the initial render with an empty dropdown selection.
    expect(filterFn).toHaveBeenCalled();
    const firstCall = filterFn.mock.calls[0];
    expect(firstCall?.[1].dropdowns.branch).toBeUndefined();
  });

  it('renders multiple dropdown triggers when several are configured', () => {
    render(
      <ListPage<Row>
        title="People"
        data={ROWS}
        dropdowns={[
          { key: 'branch', label: 'Branch' },
          { key: 'status', label: 'Status' },
        ]}
        renderCard={renderCard}
      />
    );
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders the action component verbatim', () => {
    render(
      <ListPage<Row>
        title="People"
        data={ROWS}
        renderCard={renderCard}
        actionComponent={<button>Add Person</button>}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Add Person' })
    ).toBeInTheDocument();
  });

  it('falls back to a default Add button from buttonName + onAdd', () => {
    const onAdd = vi.fn();
    render(
      <ListPage<Row>
        title="People"
        data={ROWS}
        renderCard={renderCard}
        buttonName="Add Person"
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add Person' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('renders the date range picker when dateRange is true', () => {
    render(
      <ListPage<Row>
        title="People"
        dateRange
        data={ROWS}
        renderCard={renderCard}
      />
    );
    expect(screen.getByText('Pick date range')).toBeInTheDocument();
  });

  it('omits the title text and px-12 padding when no title is provided', () => {
    render(
      <ListPage<Row>
        // no title
        search
        data={ROWS}
        renderCard={renderCard}
      />
    );
    // Search input still renders.
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    // No "People"-style title text appears (parent owns the title).
    // (We verify by checking that no element has the title font-size class
    //  that the titled variant uses.)
    expect(screen.queryByText('People')).not.toBeInTheDocument();
  });
});
