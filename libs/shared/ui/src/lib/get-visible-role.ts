import { type NavModule } from '../lib/nav-config';

type Role = 'admin' | 'hr_manager' | 'employee';

export const getVisibleModules = (
  modules: NavModule[],
  userRole: Role,
  enabledModules: string[]
) => {
  return modules
    .filter((m) => {
      if (m.roles && !m.roles.includes(userRole)) {
        return false;
      }

      if (m.modules?.length) {
        return m.modules.some((mod) => enabledModules.includes(mod));
      }

      return true;
    })
    .map((m) => ({
      ...m,
      subItems: m.subItems?.filter((s) => {
        return true;
      }),
    }));
};
