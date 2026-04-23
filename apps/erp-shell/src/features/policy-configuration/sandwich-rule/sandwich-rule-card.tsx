import { HRCard } from '@erp/ui';
import { sandwichRuleCardData } from '../schema/SandwichRuleData';
import { X } from 'lucide-react';

export const SandwichRuleCard = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-[#FFF7ED] shadow-none"
      cardContentClassName="p-0 flex flex-col gap-3"
    >
      <span className="text-[14px] font-medium leading-5 text-foreground">
        How Sandwich Rule Works
      </span>
      <div className="grid grid-cols-2 gap-6">
        {sandwichRuleCardData.map((sandwich, index) => {
          const Icon = sandwich.icon;
          return (
            <HRCard
              cardClassName=" px-3 py-2.5 border-none shadow-none rounded-xl bg-white"
              cardContentClassName="flex flex-col gap-1 p-0"
              key={index}
            >
              <div className="flex gap-1 items-center">
                <Icon
                  className={`w-4 h-4  ${
                    sandwich.icon === X
                      ? 'text-badge-text-3'
                      : 'text-badge-text-7'
                  } `}
                />
                <span
                  className={`text-[12px] font-medium leading-4  ${
                    sandwich.icon === X
                      ? 'text-badge-text-3'
                      : 'text-badge-text-7'
                  }`}
                >
                  {sandwich.title}
                </span>
              </div>

              {sandwich.sandwichRule.map((rule, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
                    {rule}
                  </span>
                </div>
              ))}
            </HRCard>
          );
        })}
      </div>
    </HRCard>
  );
};
