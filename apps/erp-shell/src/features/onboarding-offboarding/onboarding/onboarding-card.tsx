import { ActionDropdown, Badge, CheckboxGroup, HRCard } from '@erp/ui';
import { InitialsCard } from '../../../components/initial-avatar';
import { Calendar, Dot, Ellipsis, UserCheck } from 'lucide-react';
import { useState } from 'react';
import {
  employeeOnboarding,
  onboardingCardDropdown,
} from '../schema/OnboardingData';

export const OnbordingCard = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="px-6 pb-32.5">
      <HRCard
        cardClassName="border-none p-6 rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        {employeeOnboarding.map((candidates, index) => {
          const progress =
            (candidates.tasks.filter((s) => s.completed === true).length /
              candidates.tasks.length) *
            100;
          return (
            <HRCard
              cardClassName="border border-border p-4 rounded-[12px] shadow-none bg-white"
              cardContentClassName="p-0 flex flex-col gap-3"
              key={index}
            >
              <div className="flex gap-3">
                <InitialsCard name={candidates.name} className="bg-black" />
                <div className="flex-1">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <span className="text-[16px] font-medium leading-6 text-foreground">
                          {candidates.name}
                        </span>
                        {candidates.status === 'Training' && (
                          <Badge variant="warning">{candidates.status}</Badge>
                        )}
                        {candidates.status === 'Day 1 setup' && (
                          <Badge variant="primary">{candidates.status}</Badge>
                        )}
                      </div>
                      <ActionDropdown
                        open={open === index}
                        onOpenChange={(isOpen) =>
                          setOpen(isOpen ? index : null)
                        }
                        dropdownClassName="items-start"
                        trigger={
                          <div className="flex  items-center   text-[14px] font-normal">
                            <Ellipsis className="w-4 h-4 text-secondary-foreground" />
                          </div>
                        }
                        actions={onboardingCardDropdown}
                      />
                    </div>
                    <div className="flex gap-1 items-center text-secondary-foreground text-[12px] font-normal leading-4">
                      <span>{candidates.position}</span>
                      <Dot className="w-4 h-4 text-secondary-foreground" />
                      <span>{candidates.division}</span>
                    </div>
                    <div className="flex gap-1 items-center text-secondary-foreground text-[12px] font-normal leading-4">
                      <span className="flex gap-1 items-center">
                        <Calendar className="w-4 h-4 text-secondary-foreground" />
                        <span>
                          Start: {''}
                          {candidates.startDate}
                        </span>
                      </span>
                      <Dot className="w-4 h-4 text-secondary-foreground" />
                      <div className="flex gap-1 items-center">
                        <UserCheck className="w-4 h-4 text-secondary-foreground" />
                        <span>
                          Mentor: {''}
                          {candidates.mentor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-15 flex flex-col gap-2">
                <div className=" flex gap-3 items-center">
                  <div className="w-95 h-1.5 bg-chart-11 rounded-full">
                    <div
                      className="h-1.5 bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-right text-[12px] text-gray-500 ">
                    {Math.round(progress)}%
                  </div>
                </div>
                <CheckboxGroup
                  options={candidates.tasks.map((task) => ({
                    value: task.title,
                    label: task.title,
                  }))}
                  value={candidates.tasks
                    .filter((task) => task.completed === true)
                    .map((task) => task.title)}
                  optionClassName="flex flex-row-reverse justify-end gap-2 rounded-none items-center border-none bg-transparent"
                  className="grid grid-cols-3 gap-4"
                  checkboxClassName="data-[state=checked]:bg-[#7C86FF] data-[state=checked]:text-white border border-[#7C86FF]"
                />
              </div>
            </HRCard>
          );
        })}
      </HRCard>
    </div>
  );
};
