import { Dot } from 'lucide-react';
import { useLeaveRequests } from '@erp/data-access';
import type { LeaveRequest } from '../schema/LeaveRequestData';

interface LeaveRequestDetailProps {
  employeeId: string;
}
export const LeaveRequestDetail = ({ employeeId }: LeaveRequestDetailProps) => {
  const { data: response } = useLeaveRequests({ pageSize: 100 });
  // Bridge canonical (`fromDate`/`toDate`, lowercase status) to legacy shape
  // (`duration`, capitalized status) until Phase 3.2 reconciles consumers.
  const records = (response?.data ?? []).map((r) => ({
    ...r,
    duration: `${r.fromDate}-${r.toDate}`,
    status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
  })) as unknown as LeaveRequest[];
  const employee = records.find((emp) => emp.employeeId === employeeId);

  const value = employee?.status;
  const isPending = value?.toLowerCase() === 'pending';
  const isApproved = value?.toLowerCase() === 'approved';
  const isRejected = value?.toLowerCase() === 'rejected';
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border p-3 rounded-xl bg-[#F4F4F5] border-[#E4E4E7] shadow-sm gap-3">
          <span className="text-[12px] text-[#71717A] font-medium leading-4">
            Available Balance
          </span>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-[#18181B] font-medium leading-5">
                  20
                </span>
                <span className="text-[12px] text-[#71717A] font-medium leading-4">
                  Annual Leave
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-[#18181B] font-medium leading-5">
                  2
                </span>
                <span className="text-[12px] text-[#71717A] font-medium leading-4">
                  Sick Leave
                </span>
              </div>
            </div>
            <div
              className={`px-3 py-0.5 rounded-[400px] text-[14px] font-semibold leading-4 text-center ${
                isPending ? 'bg-[#FEF9C2] text-yellow-600' : ''
              }
             ${isApproved ? 'bg-[#DCFCE7] text-green-600' : ''}
            ${isRejected ? 'bg-[#FFE2E2] text-red-600' : ''}
            `}
            >
              {isPending && 'Pending'}
              {isApproved && 'Approved'}
              {isRejected && 'Rejected'}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#71717A] font-medium leading-5">
                Date Duration
              </span>
              <span className="text-[14px] text-[#18181B] font-medium leading-5 py-2.5">
                {employee?.duration}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#71717A] font-medium leading-5">
                Type/ Duration
              </span>
              <span className="text-[14px] text-[#18181B] font-medium leading-5 py-2.5 flex items-center">
                {employee?.type}
                <Dot className="w-4 h-4" />
                {employee?.totalDays}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#71717A] font-medium leading-5">
                Substitution
              </span>
              <span className="text-[14px] text-[#18181B] font-medium leading-5 py-2.5">
                Roniya Maharjan
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#71717A] font-medium leading-5">
                Attachment
              </span>
              <span className="text-[14px] text-[#18181B] font-medium leading-5 py-2.5"></span>
            </div>
          </div>
          <div className="flex flex-col border p-3 rounded-xl bg-[#F4F4F5] border-[#E4E4E7] gap-2">
            <span className="text-[12px] text-[#71717A] font-medium leading-4">
              Reason
            </span>
            <span className="text-[12px] text-[#71717A] font-normal leading-4">
              {employee?.reason}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
