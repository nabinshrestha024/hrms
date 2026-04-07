import { Badge, HRCard } from '@erp/ui';
import { personalData } from './Schema/PersonalData';
import { useGetEmployee } from '@erp/data-access';
import { Building2, Hash, Mail, Phone } from 'lucide-react';

export const PersonalInformation = () => {
  const { data: personalDatas } = useGetEmployee();
  console.warn(personalDatas, 'Data');
  return (
    <>
      {personalData?.map((items, index) => (
        <HRCard
          cardClassName="w-full h-87.5 p-6 bg-white border-none rounded-xl shadow-sm "
          cardContentClassName="p-0 flex flex-col gap-4 "
        >
          <div className="flex gap-3" key={index}>
            <div className="w-29.5 h-29.5 ">
              <img
                src={items.image}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <span className="text-[20px] font-semibold leading-7 text-foreground">
                  {items.name}
                </span>
                <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
                  {items.position}
                </span>
              </div>
              <div className={`text-[12px] leading-4 font-semibold `}>
                {items.status === 'Active' && (
                  <Badge variant="secondary">Active</Badge>
                )}
                {items.status === 'Inactive' && (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <HRCard
              cardClassName="p-2 border-none bg-[#F9FAFB] rounded-xl shadow-none"
              cardContentClassName="flex items-center gap-2 p-0"
            >
              <Hash className="w-4 h-4 text-secondary-foreground" />
              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                  Employee Id
                </span>
                <span className="text-[14px] text-foreground font-medium leading-5">
                  {items.employeeId}
                </span>
              </div>
            </HRCard>
            <HRCard
              cardClassName="p-2 border-none bg-[#F9FAFB] rounded-xl shadow-none"
              cardContentClassName="flex items-center gap-2 p-0"
            >
              <Building2 className="w-4 h-4 text-secondary-foreground" />
              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                  Department
                </span>
                <span className="text-[14px] text-foreground font-medium leading-5">
                  {items.department}
                </span>
              </div>
            </HRCard>
            <HRCard
              cardClassName="p-2 border-none bg-[#F9FAFB] rounded-xl shadow-none"
              cardContentClassName="flex items-center gap-2 p-0"
            >
              <Mail className="w-4 h-4 text-secondary-foreground" />
              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                  Email
                </span>
                <span className="text-[14px] text-foreground font-medium leading-5">
                  {items.email}
                </span>
              </div>
            </HRCard>
            <HRCard
              cardClassName="p-2 border-none bg-[#F9FAFB] rounded-xl shadow-none"
              cardContentClassName="flex items-center gap-2 p-0"
            >
              <Phone className="w-4 h-4 text-secondary-foreground" />
              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                  Phone Number
                </span>
                <span className="text-[14px] text-foreground font-medium leading-5">
                  {items.phoneNumber}
                </span>
              </div>
            </HRCard>
          </div>
        </HRCard>
      ))}
    </>
  );
};
