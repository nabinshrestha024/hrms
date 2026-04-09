import { Button, DropDown, HRCard } from '@erp/ui';
import { Dot, EllipsisVertical } from 'lucide-react';
import { employees } from '../../features/employee/Schema/EmployeeData';
import { InitialsCard } from 'src/components/InitialAvatar';

export const EmployeeCard = () => {
  return (
    <>
      <div>
        <div className="px-6 pb-19.5 bg-[#F9FAFB]">
          <HRCard
            cardClassName="border-none p-6  rounded-xl bg-white shadow-[0_1px_2px_0_rgba(255,0,0,0.05)]  "
            cardContentClassName="grid grid-cols-3 gap-4 p-0"
          >
            {employees.map((items, index) => (
              <HRCard
                key={index}
                cardClassName="relative p-4 border border-[#E4E4E7] rounded-xl bg-white shadow-[0_1px_2px_0_rgba(255,0,0,0.05)]"
                cardContentClassName="flex flex-col gap-4 p-0"
              >
                <div className="flex gap-2 items-center">
                  <InitialsCard name={items.name} />

                  <div className="flex-1 flex-col gap-2  text-[16px] leading-6 font-medium">
                    <span className="text-[#09090B]">{items.name}</span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#71717A] ">{items.email}</span>
                      <span className="text-[#71717A] ">
                        {items.designation}
                      </span>
                      <span
                        className={`flex items-center text-[#71717A] ${
                          items.status === 'Active' ? 'text-green-600' : ''
                        }`}
                      >
                        <Dot
                          className={`w-6 h-6 ${
                            items.status === 'Active'
                              ? 'text-green-600'
                              : 'text-[#09090B]'
                          }`}
                        />
                        {items.status === 'Active' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-5 ">
                  <DropDown
                    trigger={
                      <button>
                        <EllipsisVertical />
                      </button>
                    }
                    align="end"
                    className="pt-1 pb-0 px-0"
                  >
                    <div
                      className="w-full flex flex-col   transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        type="button"
                        variant="default"
                        className=" text-[#18181B] cursor-pointer text-[14px] font-normal leading-5"
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        variant="default"
                        className=" text-[#18181B] cursor-pointer text-[14px] font-normal leading-5"
                      >
                        Block
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className=" rounded-none border-t border-t-[#E4E4E7] text-red-600 cursor-pointer text-[14px] font-normal leading-5"
                      >
                        Delete
                      </Button>
                    </div>
                  </DropDown>
                </div>
              </HRCard>
            ))}
          </HRCard>
        </div>
      </div>
    </>
  );
};
