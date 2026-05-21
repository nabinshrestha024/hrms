import { Camera, KeyRound, LogOut, LucideIcon, User } from 'lucide-react';
import { FileUpload } from '../components/form/file-uploade';

interface ProfileDropdownDataProps {
  navigate: any;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  setShowLogoutDialog: (value: boolean) => void;
  user?: {
    name: string;
    role: string;
  };
}

const DropdownItem = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center px-3 py-2">
      <Icon className="w-4 h-4 text-foreground" />
      <span className="text-[14px] font-normal leading-5">{label}</span>
    </div>
  );
};

export const getProfileDropdownData = ({
  navigate,
  selectedOption,
  setSelectedOption,
  setShowLogoutDialog,
  user,
}: ProfileDropdownDataProps) => {
  return [
    {
      label: (
        <div className="flex gap-2 items-center p-3">
          <FileUpload
            className="relative flex w-12 h-12 flex-col items-center justify-center rounded-[400px] bg-chart-10"
            subLable=""
            icon={User}
            iconClass="w-5 h-5 text-white"
            buttonClassName="text-black absolute bottom-0 right-0"
            previewClassName="rounded-full"
            drag
            browseText={
              <div className="flex w-5 h-5 items-center justify-center rounded-full bg-[#E5E7EB]">
                <Camera size={12} />
              </div>
            }
          />

          <div className="flex flex-col gap-1 items-start">
            <span className="text-[14px] font-semibold leading-5">
              {user?.name ?? 'John Doe'}
            </span>

            <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
              {user?.role ?? 'Project Manager'}
            </span>
          </div>
        </div>
      ),
      className: 'h-20 px-0',
    },

    {
      label: <DropdownItem icon={KeyRound} label="Employee Contract" />,
      className: 'border-t border-t-border px-0',
      isActive: selectedOption === 'Employee Contract',
      onClick: () => setSelectedOption('Employee Contract'),
    },

    {
      label: <DropdownItem icon={User} label="Personal Profile" />,
      className: 'px-0',
      isActive: selectedOption === 'Personal Profile',
      onClick: () => {
        setSelectedOption('Personal Profile');

        navigate({
          to: '/profile',
        });
      },
    },

    {
      label: <DropdownItem icon={LogOut} label="Sign Out" />,
      className: 'border-t border-t-border px-0',
      onClick: () => {
        setShowLogoutDialog(true);
      },
    },
  ];
};
