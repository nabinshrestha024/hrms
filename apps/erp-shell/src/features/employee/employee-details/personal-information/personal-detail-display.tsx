import type { Employee } from '@erp/data-access';
import { HRCard } from '@erp/ui';

export const PersonalDetailDisplay = ({ employee }: { employee: Employee }) => {
  return (
    <>
      <HRCard
        cardClassName="border-none p-0 rounded-none shadow-none bg-white"
        cardContentClassName="p-0"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              First Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.firstName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Middle Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.middleName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Last Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.lastName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Personal Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground max-w-35 truncate">
              {employee?.email}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Phone number
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.phone}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Country
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.country}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Province
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.province}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              District
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.city}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Municipality/VDC
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground line-clamp-1">
              {employee?.municipality}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Ward Number
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.ward}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Date of Bith
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.dateOfBirth}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Gender
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.gender}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Marital Status
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.maritalStatus}
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
