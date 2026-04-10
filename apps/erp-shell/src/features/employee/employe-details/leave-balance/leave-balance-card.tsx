import { leaveBalanceData } from '../../Schema/LeaveBalanceData';
import { HRCard } from '@erp/ui';
import { History } from 'lucide-react';
import { LeaveDetails } from './leave-details';

type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
  onOpen: <T extends string>(config: {
    componentClassName: string;
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    dialogClassName?: string;
    onCancel?: () => void;
  }) => void;
}
// type SelectedLeave = {
//   id:number,
//   leave:leaveBalance,
// }
export const LeaveBalanceCard = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="grid grid-cols-3 gap-4">
          {leaveBalanceData.map((items) => {
            const remaining = items.total - items.used;

            const progress =
              items.used === 0
                ? 100
                : Math.max((remaining / items.total) * 100, 0);

            const barStyle = {
              width: `${progress}%`,
              backgroundColor: '#4F39F6',
              height: '100%',
            };

            return (
              <HRCard
                key={items.leave}
                cardClassName="p-6 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
                cardContentClassName=" p-0"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="text-[12px] font-medium leading-4 text-[#71717A]">
                        {items.leave}
                      </div>
                      <div className="text-[24px] font-normal text-[#312C85] flex gap-2 items-end">
                        {items.day}.0
                        <span className="text-[12px] leading-4 font-normal text-[#71717A]">
                          Days Left
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        onOpen({
                          dialogClassName: 'sm:max-w-[738px]',
                          componentClassName:
                            'p-0 mt-0 shadow-none border-none rounded-none',
                          title: 'Leave Details',
                          modalTitle: null,
                          okText: null,
                          component: <LeaveDetails leaveData={items} />,
                          size: 'lg',
                        });
                      }}
                    >
                      <History className="text-[16px] text-[#615FFF]" />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>Total: {items.total}.0</div>
                    <div>Used: {items.used}.0</div>
                  </div>

                  <div className="w-full h-3 bg-indigo-50 rounded-full overflow-hidden">
                    <div
                      style={barStyle}
                      className="rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              </HRCard>
            );
          })}
        </div>
      </div>
    </>
  );
};
