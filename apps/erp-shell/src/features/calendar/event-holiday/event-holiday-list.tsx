import { Badge, HRCard } from '@erp/ui';
import { Flag, Gift, PartyPopper, Sparkles } from 'lucide-react';
import { Event } from '../schema/EventData';
import { IconButton } from '../../../components/icon-button';

interface EventListProps {
  data: Event[];
}
export const EventList = ({ data }: EventListProps) => {
  return (
    <>
      <div className="px-3 lg:px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="p-3 lg:p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid grid-cols-1  gap-6 p-0"
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
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 items-center">
                        <span className="text-foreground font-medium text-[16px] leading-6">
                          {items.title}
                        </span>
                        {items.type === 'Holiday' ? (
                          <Badge variant="destructive">{items.type}</Badge>
                        ) : items.type === 'Event' ? (
                          <Badge variant="secondary">{items.type}</Badge>
                        ) : items.type === 'Birthday' ? (
                          <Badge variant="primary">{items.type}</Badge>
                        ) : items.type === 'Anniversary' ? (
                          <Badge variant="primary">{items.type}</Badge>
                        ) : null}
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
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] leading-6 font-medium text-foreground">
                        {items.date}
                      </span>
                      <span className="text-[12px] leading-4 font-medium text-secondary-foreground text-right">
                        {items.day}
                      </span>
                    </div>
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
