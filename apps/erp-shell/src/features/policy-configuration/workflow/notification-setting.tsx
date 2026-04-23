import { HRCard, Switch } from '@erp/ui';
import { notificationData } from '../schema/WorkflowData';

export const NotificationSetting = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <div className="text-[16px] leading-6 font-medium text-foreground">
        Notification Settings
      </div>
      <div className="grid grid-cols-4 gap-4">
        {notificationData.map((notification, index) => (
          <HRCard
            key={index}
            cardClassName="border border-border px-3 py-2.5 rounded-xl shadow-none"
            cardContentClassName="p-0 flex flex-col gap-4 justify-center items-center"
          >
            <Switch />
            <span className="text-[14px] leading-5 font-medium text-foreground">
              {notification}
            </span>
          </HRCard>
        ))}
      </div>
    </HRCard>
  );
};
