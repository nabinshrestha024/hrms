import { Switch } from '@erp/ui';
interface CommonOptionSubComponentProps {
  value: string;
}
export const MonthlyAccrual = ({ value }: CommonOptionSubComponentProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-[14px] text-foreground font-medium leading-5">
      Accrual Days
    </span>
    <span className="text-[14px] font-normal text-foreground leading-5 px-3 py-2.5 rounded-[6px] w-full border border-border bg-white">
      {value}
    </span>
  </div>
);

export const ManualAccrual = () => (
  <div className="flex flex-col gap-3 px-3 py-2.5 border border-border rounded-[6px] bg-muted ">
    <div className="flex justify-between items-center">
      <span className="text-[14px] font-normal text-foreground leading-5">
        Total days employment
      </span>
      <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
        <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
          0
        </div>
        <div className="w-16 h-9 border border-border rounded-r-[6px] bg-[#E5E7EB] px-2 items-center flex justify-center">
          days
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[14px] font-normal text-foreground leading-5">
        Number of times allowed during employment
      </span>
      <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
        <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
          0
        </div>
        <div className="w-16 h-9 border border-border rounded-r-[6px] bg-[#E5E7EB] px-2 items-center flex justify-center">
          days
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-normal text-foreground leading-5">
          Allow Request
        </span>
        <span className="text-[14px] font-normal text-secondary-foreground leading-5">
          If not allowed, should be assigned
        </span>
      </div>
      <Switch />
    </div>
  </div>
);
