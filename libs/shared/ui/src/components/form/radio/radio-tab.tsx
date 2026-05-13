import { type ReactNode } from 'react';
import {
  Tabs as Root,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../primitives/tabs';
import { LimitedOptionCheckboxGroup } from '../check-box/assign-template-checkbox';
import { CheckIcon } from 'lucide-react';

interface TabDataType {
  id: number;
  content: ReactNode;
  value: string;
  branch: {
    label: string;
    val: string;
  }[];
}

interface TabProps {
  defaultValue: string;
  tabClassName: string;
  tabListClassName: string;
  tabList: TabDataType[];
  tabTriggerClassName: string;
  selectedDataScope: string;
  setSelectedDataScope: (value: string) => void;
  employeeBranch?: string;
  selectedBranches: string[];
  setSelectedBranches: (value: string[]) => void;
}

export const RadioTab = ({
  defaultValue,
  tabClassName,
  employeeBranch,
  tabListClassName,
  tabList,
  tabTriggerClassName,
  setSelectedDataScope,
  selectedBranches,
  setSelectedBranches,
}: TabProps) => {
  return (
    <Root
      defaultValue={defaultValue}
      className={tabClassName}
      onValueChange={(val) => {
        setSelectedDataScope(val);
      }}
    >
      <TabsList className={`flex w-full ${tabListClassName}`}>
        {tabList.map((val) => (
          <TabsTrigger
            key={val.id}
            value={val.value}
            className={`${tabTriggerClassName} data-[state=active]:text-primary`}
          >
            {val.content}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabList.map((val) => (
        <TabsContent key={val.id} value={val.value}>
          <div className="grid grid-cols-2 gap-3">
            {val.value === 'global' && (
              <div className="col-span-2 text-[14px] text-secondary-foreground py-2">
                All branch access
              </div>
            )}

            {val.value === 'limited' && (
              <div className="col-span-2">
                <LimitedOptionCheckboxGroup
                  options={val.branch.map((branchItem) => ({
                    value: branchItem.val,
                    label: branchItem.label,
                  }))}
                  value={selectedBranches}
                  onValueChange={(updated) => {
                    setSelectedBranches(updated);
                  }}
                  className="grid grid-cols-2 gap-3"
                  optionClassName="relative border rounded-[6px] p-2 cursor-pointer transition-all flex justify-between px-2 py-2 rounded-full-none rounded-[6px]"
                />
              </div>
            )}

            {val.value === 'self' && (
              <div className="flex justify-between  text-[14px] text-foreground border border-primary bg-primary-foreground p-2 rounded-[6px]">
                {employeeBranch ?? '—'}
                {employeeBranch && (
                  <CheckIcon className="w-5 h-5 text-primary" />
                )}
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Root>
  );
};
