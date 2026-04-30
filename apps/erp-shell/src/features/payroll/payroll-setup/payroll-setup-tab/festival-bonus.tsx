import { Button, CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { FestivalBonusForm } from './festival-bonus/festival-bonus-form';

export const FestivalBonus = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-115 h-full overflow-auto flex flex-col gap-8">
        <CustomAlert
          title="Dashain Bonus (Festival Allowance)"
          description="As per Nepal labor law, employees are entitled to one month's basic salary as festival bonus. 
          The bonus is taxable and can be distributed for tax purposes either as a lump sum or spread across monthly salary 
          for lower tax liability."
          icon={<Info className="w-4 h-4" />}
        />
        <FestivalBonusForm />
      </div>
      <div className="sticky bottom-0 z-10 bg-white p-6 rounded-b-xl border-t border-border flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          className="text-[14px] font-medium leading-5 text-muted-foreground "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="flex gap-2  text-[14px] font-medium leading-5 text-white items-center"
          form="festival-bonus-form"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
