import { leaveBalanceData } from '../../Schema/LeaveBalanceData';

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
