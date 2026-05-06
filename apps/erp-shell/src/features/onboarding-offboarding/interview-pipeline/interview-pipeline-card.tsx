import { ActionDropdown, Badge, HRCard } from '@erp/ui';
import candidateData from '../schema/CandidateData';
import { InitialsCard } from '../../../components/initial-avatar';
import { Dot, Ellipsis, Star } from 'lucide-react';
import { useState } from 'react';
import { interviewCardDropdown } from '../schema/InterviewPipelineData';
import { PipelineStepper } from './stepper-component';

export const InterviewPipelineCard = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="px-6 pb-32.5">
      <HRCard
        cardClassName="border-none p-6 rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        {candidateData.map((candidates, index) => (
          <HRCard
            cardClassName="border border-border p-4 rounded-[12px] shadow-none bg-white"
            cardContentClassName="p-0 flex flex-col gap-3"
            key={index}
          >
            <div className="flex gap-3">
              <InitialsCard name={candidates.name} className="bg-black" />
              <div className="flex-1">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-[16px] font-medium leading-6 text-foreground">
                        {candidates.name}
                      </span>
                      {candidates.stages.map((stage) =>
                        stage.status === 'active' ? (
                          <Badge variant="primary" key={stage.name}>
                            {stage.name}
                          </Badge>
                        ) : null
                      )}
                    </div>
                    <ActionDropdown
                      open={open === index}
                      onOpenChange={(isOpen) => setOpen(isOpen ? index : null)}
                      dropdownClassName="items-start"
                      trigger={
                        <div className="flex  items-center   text-[14px] font-normal">
                          <Ellipsis className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      }
                      actions={interviewCardDropdown}
                    />
                  </div>
                  <div className="flex gap-1 items-center text-secondary-foreground text-[12px] font-normal leading-4">
                    <span>{candidates.role}</span>
                    <Dot className="w-4 h-4 text-secondary-foreground" />
                    <span>{candidates.department}</span>
                  </div>
                  <div className="flex gap-1 items-center text-secondary-foreground text-[12px] font-normal leading-4">
                    <span>
                      Interviewer: {''}
                      {candidates.interviewer}
                    </span>
                    <Dot className="w-4 h-4 text-secondary-foreground" />
                    <span>
                      Scheduled: {''}
                      {candidates.scheduledDate}
                    </span>
                    <Dot className="w-4 h-4 text-secondary-foreground" />
                    <span className="flex gap-1 items-center">
                      <Star className="w-4 h-4 text-text-4 " fill="#FE9A00" />
                      {candidates.overallRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <PipelineStepper stages={candidates.stages} />
          </HRCard>
        ))}
      </HRCard>
    </div>
  );
};
