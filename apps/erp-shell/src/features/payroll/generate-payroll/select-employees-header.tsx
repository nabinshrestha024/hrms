import { ActionDropdown } from '@erp/ui';
import { ChevronDown } from 'lucide-react';
import { nepaliMonths } from '../schema/GeneratePayrollData';
import { useEffect, useState } from 'react';
import { getCurrentBSYear } from '@erp/utils';

export const SelectEmployeeHeader = () => {
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const currentBSYear = getCurrentBSYear();

  const [year, setYear] = useState(currentBSYear);
  const [years, setYears] = useState<{ label: string; onClick: () => void }[]>(
    []
  );

  const [selectedMonth, setSelectedMonth] = useState('Months');
  const [selectedYear, setSelectedYear] = useState('Years');

  useEffect(() => {
    const list = [];
    for (let y = 2079; y <= currentBSYear; y++) {
      list.push({
        label: String(y),
        onClick: () => {
          setYear(y);
          setOpenYear(false);
        },
      });
    }
    setYears(list);
  }, [currentBSYear]);

  const monthActions = nepaliMonths.map((month) => ({
    label: month.label,
    onClick: () => {
      setSelectedMonth(month.label);
      setOpenMonth(false);
    },
  }));

  const yearActions = years.map((year) => ({
    label: year.label,
    onClick: () => {
      setSelectedYear(year.label);
      setOpenYear(false);
    },
  }));

  return (
    <div className="flex justify-between items-center">
      <span>Select Employees</span>

      <div className="flex gap-4">
        <ActionDropdown
          open={openMonth}
          onOpenChange={setOpenMonth}
          trigger={
            <div className="cursor-pointer flex gap-2 items-center border rounded-[6px] px-4 py-2 border-[#E4E4E7] bg-white text-[14px]">
              <span>{selectedMonth}</span>
              <ChevronDown className="text-[20px]" />
            </div>
          }
          actions={monthActions}
        />

        <ActionDropdown
          open={openYear}
          onOpenChange={setOpenYear}
          trigger={
            <div className="cursor-pointer flex gap-2 items-center border rounded-[6px] px-4 py-2 border-[#E4E4E7] bg-white text-[14px]">
              <span>{selectedYear}</span>
              <ChevronDown className="text-[20px]" />
            </div>
          }
          actions={yearActions}
        />
      </div>
    </div>
  );
};
