import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Can } from './can';
import { AbilityContext } from './ability-provider';
import { SimpleAbility } from './ability';

const granted = new SimpleAbility(['hr:employees:read', 'hr:employees:create']);
const denied = new SimpleAbility([]);

function renderWithAbility(ability: SimpleAbility, ui: React.ReactElement) {
  return render(
    <AbilityContext.Provider value={ability}>{ui}</AbilityContext.Provider>
  );
}

describe('Can', () => {
  it('renders children when permission is granted', () => {
    renderWithAbility(
      granted,
      <Can action="read" subject="hr:employees">
        <button>Edit</button>
      </Can>
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('hides children when permission is denied', () => {
    renderWithAbility(
      denied,
      <Can action="read" subject="hr:employees">
        <button>Edit</button>
      </Can>
    );
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('renders fallback when permission is denied', () => {
    renderWithAbility(
      denied,
      <Can
        action="read"
        subject="hr:employees"
        fallback={<span>No access</span>}
      >
        <button>Edit</button>
      </Can>
    );
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.getByText('No access')).toBeInTheDocument();
  });
});
