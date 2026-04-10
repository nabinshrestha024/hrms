import { useEvents, type Event as EventType } from '@erp/data-access';
import { Badge, HRCard } from '@erp/ui';
import { Flag, Gift, PartyPopper, Sparkles } from 'lucide-react';
import { IconButton } from '../../components/icon-button';

export const Event = () => {
  const { data, isLoading } = useEvents();
  const eventData: EventType[] = data ?? [];

  if (isLoading) {
    return (
      <HRCard
        cardClassName="w-full h-153 p-6 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          Events & Celebrations
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-secondary-foreground animate-pulse">
            Loading...
          </span>
        </div>
      </HRCard>
    );
  }

  return (
    <>
      <HRCard
        cardClassName="w-full h-153 p-6 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          Events & Celebrations
        </div>
        <div className="flex flex-col gap-3">
          {eventData.map((val) => (
            <HRCard
              cardClassName="p-2 bg-background rounded-xl overflow-auto border-none shadow-none"
              cardContentClassName="p-0"
              key={val.id}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div
                    className={` p-1 rounded-sm  w-6 h-6
                        `}
                  >
                    {val.eventType === 'Event' && (
                      <IconButton variant="secondary">
                        <PartyPopper className="w-4 h-4" />
                      </IconButton>
                    )}
                    {val.eventType === 'Anniversary' && (
                      <IconButton variant="primary">
                        <Sparkles className="w-4 h-4 " />
                      </IconButton>
                    )}
                    {val.eventType === 'Birthday' && (
                      <IconButton variant="primary">
                        <Gift className="w-4 h-4 " />
                      </IconButton>
                    )}
                    {val.eventType === 'Holiday' && (
                      <IconButton variant="destructive">
                        <Flag className="w-4 h-4 " />
                      </IconButton>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] leading-5 font-medium text-foreground line-clamp-1">
                      {val.title}
                    </span>
                    <span className="text-[12px] leading-4 font-normal text-secondary-foreground line-clamp-2">
                      {val.date} . {val.description}
                    </span>
                  </div>
                </div>
                <div
                  className={`h-6 py-1 px-2 rounded-[400px] font-normal text-[12px] leading-4`}
                >
                  {val.eventType === 'Event' && (
                    <Badge variant="secondary">Event</Badge>
                  )}
                  {val.eventType === 'Anniversary' && (
                    <Badge variant="primary">Anniversary</Badge>
                  )}
                  {val.eventType === 'Birthday' && (
                    <Badge variant="primary">Birthday</Badge>
                  )}
                  {val.eventType === 'Holiday' && (
                    <Badge variant="destructive">Holiday</Badge>
                  )}
                </div>
              </div>
            </HRCard>
          ))}
          {eventData.length >= 4 && (
            <div className="text-[12px] leading-4 font-normal text-secondary-foreground flex justify-end cursor-pointer hover:underline hover:underline-primary hover:text-primary">
              See More
            </div>
          )}
        </div>
      </HRCard>
    </>
  );
};
