import { createContext, useMemo, type ReactNode } from 'react';
import { SimpleAbility, type Ability } from './ability';
import { useAuthStore } from './auth-store';

export const AbilityContext = createContext<Ability>(new SimpleAbility([]));

export function AbilityProvider({ children }: { children: ReactNode }) {
  const permissions = useAuthStore((s) => s.permissions);
  const ability = useMemo(() => new SimpleAbility(permissions), [permissions]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
