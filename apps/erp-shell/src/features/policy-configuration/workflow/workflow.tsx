import { HRCard } from '@erp/ui';
import { ApprovalWorkflow } from './approval-workflow';
import { AdminOverridePermission } from './admin-override-permission';
import { BalanceValidation } from './balance-validation';
import { NotificationSetting } from './notification-setting';

export const Workflow = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <ApprovalWorkflow />
        <AdminOverridePermission />
        <NotificationSetting />
        <BalanceValidation />
      </HRCard>
    </div>
  );
};
