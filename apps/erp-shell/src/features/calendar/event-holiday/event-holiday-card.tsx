import { HRCard } from '@erp/ui';
import { Flag, Gift, PartyPopper, Sparkles } from 'lucide-react';
import { Event } from '../schema/EventData';
import { IconButton } from '../../../components/icon-button';

interface EventCardProps {
  data: Event[];
}
export const EventCard = ({ data }: EventCardProps) => {
  return (
    <>
      <div className="px-3 lg:px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="p-3 lg:p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 lg:gap-6 p-0"
        >
          {data.length > 0 ? (
            <>
              {data.map((items) => (
                <HRCard
                  key={items.id}
                  cardClassName="p-4 border border-border rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
                  cardContentClassName="flex flex-col gap-4 p-0"
                >
                  <div className="flex justify-between">
                    {items.type === 'Holiday' ? (
                      <IconButton
                        variant="destructive"
                        className="w-10 h-10 rounded-xl"
                      >
                        <Flag className="w-4 h-4" />
                      </IconButton>
                    ) : items.type === 'Event' ? (
                      <IconButton
                        variant="secondary"
                        className="w-10 h-10 rounded-xl"
                      >
                        <PartyPopper className="w-4 h-4" />
                      </IconButton>
                    ) : items.type === 'Birthday' ? (
                      <IconButton
                        variant="primary"
                        className="w-10 h-10 rounded-xl"
                      >
                        <Gift className="w-4 h-4" />
                      </IconButton>
                    ) : items.type === 'Anniversary' ? (
                      <IconButton
                        variant="primary"
                        className="w-10 h-10 rounded-xl"
                      >
                        <Sparkles className="w-4 h-4" />
                      </IconButton>
                    ) : (
                      <></>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] leading-6 font-medium text-foreground">
                        {items.date}
                      </span>
                      <span className="text-[12px] leading-4 font-medium text-secondary-foreground text-right">
                        {items.day}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col ">
                      <span className="text-foreground font-medium text-[16px] leading-6">
                        {items.title}
                      </span>
                      <span className="text-[14px] text-secondary-foreground font-medium leading-5">
                        {items.type}
                      </span>
                    </div>
                    {items.note ? (
                      <span className="text-secondary-foreground font-normal text-[12px] leading-4">
                        {items.note}
                      </span>
                    ) : (
                      <span className="text-secondary-foreground font-normal text-[12px] leading-4">
                        {items.joinedOn}
                      </span>
                    )}
                  </div>
                </HRCard>
              ))}
            </>
          ) : (
            <div className="text-center text-foreground text-[20px] font-medium">
              Data Not Found
            </div>
          )}
        </HRCard>
      </div>
    </>
  );
};
