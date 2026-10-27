import { CheckCircle, Clock } from 'lucide-react';
import { Stage } from '../schema/CandidateData';
import { IconButton } from '../../../components/icon-button';

export const PipelineStepper = ({ stages }: { stages: Stage[] }) => {
  const progress =
    (stages.filter((s) => s.status === 'completed').length / stages.length) *
    100;

  return (
    <div className="ml-15">
      <div className="flex gap-4 relative">
        {stages.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isLast = index === stages.length - 1;
          return (
            <div
              key={index}
              className="max-w-15.5 flex flex-col gap-2 relative"
            >
              <div className="z-10">
                {isCompleted ? (
                  <div className="flex gap-2 items-center">
                    <IconButton
                      variant="secondary"
                      className="rounded-full bg-text-5 flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </IconButton>
                    <div className="w-7 h-1 bg-success"></div>
                  </div>
                ) : isActive ? (
                  <div className=" flex gap-2 items-center">
                    <IconButton
                      variant="primary"
                      className="rounded-full bg-chart-9 flex items-center justify-center"
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </IconButton>
                    {!isLast && <div className="w-7 h-1 bg-chart-10" />}
                  </div>
                ) : (
                  <div className=" flex gap-2 items-center">
                    <IconButton
                      variant="default"
                      className="rounded-full bg-chart-10 flex items-center justify-center"
                    >
                      <Clock className="w-5 h-5 text-secondary-foreground" />
                    </IconButton>
                    {!isLast && <div className="w-7 h-1 bg-chart-10" />}
                  </div>
                )}
              </div>

              <span className="text-[12px]  text-secondary-foreground font-normal leading-4">
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-3 items-center">
        <div className="w-95 h-1.5 bg-chart-11 rounded-full">
          <div
            className="h-1.5 bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-[12px] text-gray-500 ">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};
