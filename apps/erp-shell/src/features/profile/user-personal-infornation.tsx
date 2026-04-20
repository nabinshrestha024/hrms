import { UserEmergencyDetail } from './personal-information/emergency-detail';
import { UserPersonalDetail } from './personal-information/personal-detail';

export const UserPersonalInformation = () => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-[#09090B]">
          Personal Information
        </div>
        <UserPersonalDetail />
        <UserEmergencyDetail />
      </div>
    </>
  );
};
