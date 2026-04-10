import { leaveBalanceData } from '../../schema/leave-balance-data';

interface LeaveBalanceProps {
  leaveId: number;
}
export const YearSummary = ({ leaveId }: LeaveBalanceProps) => {
  const leave = leaveBalanceData.filter((item) => item.id === leaveId);
  return (
    <>
      <div></div>
    </>
  );
};
