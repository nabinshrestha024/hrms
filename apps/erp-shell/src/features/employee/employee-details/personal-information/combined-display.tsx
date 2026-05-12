import { EmergencyDetailDisplay } from './emergency-detail-display';
import { PersonalDetailDisplay } from './personal-detail-display';

import type { Employee } from '@erp/data-access';

interface CombinedDisplayProps {
  employee: Employee;
}

export const CombinedDisplay = ({ employee }: CombinedDisplayProps) => {
  return (
    <div className="flex flex-col gap-6">
      <PersonalDetailDisplay employee={employee} />

      <EmergencyDetailDisplay employee={employee} />
    </div>
  );
};
