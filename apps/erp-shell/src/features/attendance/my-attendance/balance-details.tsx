export const BalanceDetails = () => {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-xl border border-border bg-muted shadow-sm">
      <span className="text-[12px] text-secondary-foreground font-medium leading-4">
        Available Balances
      </span>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-foreground font-medium leading-5">
            20
          </span>
          <span className="text-[12px] text-secondary-foreground font-medium leading-4">
            Annual leaave
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-foreground font-medium leading-5">
            2
          </span>
          <span className="text-[12px] text-secondary-foreground font-medium leading-4">
            Sick leaave
          </span>
        </div>
      </div>
    </div>
  );
};
