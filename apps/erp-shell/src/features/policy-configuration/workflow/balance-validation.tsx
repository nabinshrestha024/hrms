import { HRCard, Switch } from '@erp/ui';

const balanceValidationData = [
  {
    balanceTitle: 'Check Balance Before Apply',
    balanceSubTitle: 'Prevent applications exceeding available balance',
  },
  {
    balanceTitle: 'Allow Negative Balance',
    balanceSubTitle: 'Allow employees to apply for leave beyond their balance',
  },
];

export const BalanceValidation = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <div className="text-[16px] leading-6 font-medium text-foreground">
        Balance Validation
      </div>
      <div className="flex flex-col gap-4">
        {balanceValidationData.map((balanceValidation, index) => (
          <HRCard
            key={index}
            cardClassName="border border-border px-3 py-2.5 rounded-xl shadow-none"
            cardContentClassName="p-0 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-medium leading-5 text-foreground">
                  {balanceValidation.balanceTitle}
                </span>

                <Switch />
              </div>
              <span className="w-106 text-[14px] font-normal leading-5 text-secondary-foreground">
                {balanceValidation.balanceSubTitle}
              </span>
            </div>
          </HRCard>
        ))}
      </div>
    </HRCard>
  );
};
