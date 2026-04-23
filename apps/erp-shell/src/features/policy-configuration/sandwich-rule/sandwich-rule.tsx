import { HRCard } from '@erp/ui';
import { SandwichRuleCard } from './sandwich-rule-card';
import { SandwichRuleTable } from './table/sandwich-rule-table';
import { sandwichRuleTableData } from '../schema/SandwichRuleData';

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
