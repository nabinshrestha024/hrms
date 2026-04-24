import { HRCard } from '@erp/ui';
import { salaryPreviewData } from '../../schema/SalaryPreviewData';

export const SalaryPreview = () => {
  return (
    <HRCard
      cardClassName="p-3 border border-border rounded-xl shadow-sm bg-muted"
      cardContentClassName="p-0 flex flex-col gap-4"
    >
      <span>Salary Preview (Monthly)</span>
      <div className="grid grid-cols-5 gap-4">
        {salaryPreviewData.map((salary, index) => (
          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-secondary-foreground font-normal leading-4">
              {salary.salaryType}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className={`text-[12px] text-foreground font-medium leading-4 ${
                  salary.id === '1' || salary.id === '4'
                    ? 'text-primary'
                    : salary.id === '3'
                    ? 'text-red-600'
                    : salary.id === '2'
                    ? 'text-green-600'
                    : 'text-gray-600'
                }`}
              >
                {salary.amount}
              </span>
              {salary.description && (
                <span className="text-[8px] text-secondary-foreground font-normal leading-4">
                  {salary.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </HRCard>
  );
};
