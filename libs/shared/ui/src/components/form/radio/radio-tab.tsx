import { type ReactNode } from 'react';
import { CheckIcon } from 'lucide-react';
import {
  Tabs as Root,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../primitives/tabs';
import { HRInput } from '../input';
import { HRLabel } from '../label';

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
}

export const RadioTab = ({
  defaultValue,
  tabClassName,
  tabListClassName,
  tabList,
  tabTriggerClassName,
  selectedDataScope,
  setSelectedDataScope,
  ...props
}: TabProps) => {
  return (
    <Root defaultValue={defaultValue} className={tabClassName}>
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
            {val.branch.map((branchItem, index) => {
              const isSelected = selectedDataScope === branchItem.label;

              return (
                <HRLabel
                  key={index}
                  labelClassName={` relative border rounded-[6px] p-2 cursor-pointer transition-all flex justify-between  ${
                    isSelected
                      ? 'border-primary bg-[#EEF2FF] text-foreground'
                      : 'border-border'
                  }`}
                  onClick={() => setSelectedDataScope(branchItem.label)}
                >
                  <span className="font-normal text-[12px] leading-5 text-secondary-foreground">
                    {branchItem.label}
                  </span>

                  {isSelected && (
                    <CheckIcon className="absolute top-2 right-2 w-5 h-5 text-primary" />
                  )}

                  <HRInput
                    type="radio"
                    value={selectedDataScope}
                    className="hidden"
                    {...props}
                  />
                </HRLabel>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Root>
  );
};
