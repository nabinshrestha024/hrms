import { Badge, Button, HRCard } from '@erp/ui';
import { jobOpeningData } from '../schema/JobOpeningData';
import { Briefcase, Dot, Timer } from 'lucide-react';

export const JobOpeningCard = () => {
  return (
    <div className="px-6 pb-32.5">
      <HRCard
        cardClassName="p-6 rounded-xl shadow-none bg-white border-none"
        cardContentClassName="p-0"
      >
        <div className="grid grid-cols-3 gap-4">
          {jobOpeningData.map((jobDetails, index) => (
            <HRCard
              key={index}
              cardClassName="p-6 rounded-xl shadow-none bg-white border border-border"
              cardContentClassName="p-0 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span>{jobDetails.jobTitle}</span>
                    <Badge variant="default">Published</Badge>
                  </div>
                  <span className="flex gap-1 items-center text-[14px] font-medium leading-5  text-text-2">
                    {jobDetails.department}
                    <Dot className="w-4 h-4 text-secondary-foreground" />
                    {jobDetails.location}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <Timer className="w-4 h-4 text-text-3" />
                    <span className="text-[14px] font-medium leading-5  text-text-3">
                      {jobDetails.experience}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Briefcase className="w-4 h-4 text-text-3" />
                    <span className="text-[14px] font-medium leading-5  text-text-3">
                      {jobDetails.employementTye}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="secondary">Apply Now</Button>
            </HRCard>
          ))}
        </div>
      </HRCard>
    </div>
  );
};
