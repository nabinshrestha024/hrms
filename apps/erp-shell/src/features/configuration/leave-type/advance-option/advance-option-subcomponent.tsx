export const AdvanceOptionSubcomponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 px-3 py-2.5 border border-border rounded-[6px] bg-muted ">
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-normal text-foreground leading-5">
            How farther away in the future leave can be requested
          </span>
          <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
            <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
              30
            </div>
            <div className="w-16 h-9 border border-border rounded-r-[6px] bg-border px-2 items-center flex justify-center">
              days
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-normal text-foreground leading-5">
            How many days back in the past leave can be requested
          </span>
          <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
            <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
              30
            </div>
            <div className="w-16 h-9 border border-border rounded-r-[6px] bg-border px-2 items-center flex justify-center">
              days
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-3 py-2.5 border border-border rounded-[6px] bg-muted ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 text-[14px] font-normal text-foreground leading-5">
            <span> Minimum days this leave should be requested</span>
            <span className="text-[12px] text-secondary-foreground">
              If half days and hourly leaves are allowed, it will be ignored
            </span>
          </div>
          <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
            <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
              0.5
            </div>
            <div className="w-16 h-9 border border-border rounded-r-[6px] bg-border px-2 items-center flex justify-center">
              days
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-normal text-foreground leading-5">
            Maximum days this leave can be requested
          </span>
          <div className="flex text-[14px] font-normal text-foreground leading-5 items-center">
            <div className="w-16 h-9 border border-border rounded-l-[6px] bg-white px-2 text-secondary-foreground items-center flex justify-center">
              18
            </div>
            <div className="w-16 h-9 border border-border rounded-r-[6px] bg-border px-2 items-center flex justify-center">
              days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
