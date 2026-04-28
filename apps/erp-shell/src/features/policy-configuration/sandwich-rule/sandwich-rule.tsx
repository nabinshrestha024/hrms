import { HRCard } from '@erp/ui';
import { SandwichRuleCard } from './sandwich-rule-card';
import { SandwichRuleTable } from './table/sandwich-rule-table';
import type { SandwichRuleTableType } from '../schema/SandwichRuleData';

const sandwichRuleTableData: SandwichRuleTableType[] = [
  {
    paid: 'Enabled',
    code: 'AL',
    name: 'Annual Leave',
    description: 'Yearly vacation leave',
    sandwichRule: true,
  },
  {
    paid: 'Disabled',
    code: 'SL',
    name: 'Sick Leave',
    description: 'Medical leave',
    sandwichRule: false,
  },
  {
    paid: 'Enabled',
    code: 'CL',
    name: 'Casual Leave',
    description: 'Short notice leave',
    sandwichRule: true,
  },
  {
    paid: 'Enabled',
    code: 'HL',
    name: 'Home Leave',
    description: 'Leave to visit hometown',
    sandwichRule: true,
  },
  {
    paid: 'Enabled',
    code: 'ML',
    name: 'Maternity Leave',
    description: 'Pregnancy/ childbirth leave',
    sandwichRule: true,
  },
  {
    paid: 'Disabled',
    code: 'PL',
    name: 'Paternity Leave',
    description: 'New father leave',
    sandwichRule: false,
  },
  {
    paid: 'Enabled',
    code: 'BL',
    name: 'Bereavement Leave',
    description: 'Death in family',
    sandwichRule: true,
  },
];

export const SandwichRule = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <SandwichRuleCard />
        <SandwichRuleTable data={sandwichRuleTableData} />
      </HRCard>
    </div>
  );
};
