import { HRCard } from '@erp/ui';
import { Link } from '@tanstack/react-router';
import { quickAccessData } from './schema/quick-action-data';

export const QuickAction = () => {
  return (
    <>
      <HRCard
        cardClassName="w-full h-87.5 p-6 bg-white border-none rounded-xl shadow-sm  "
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickAccessData.map((val, index) => {
            const Icon = val.icon;
            return (
              <Link to={val.path} key={index}>
                <HRCard
                  cardClassName="px-6 pt-6 pb-3.5 border border-primary rounded-xl bg-white shadow-sm"
                  cardContentClassName="flex flex-col p-0 gap-3 items-center cursor-pointer"
                >
                  <div className="rounded-sm bg-chart-1 p-1">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col items-center  gap-2">
                    <span className="text-[14px] text-foreground font-medium leading-5 line-clamp-1">
                      {val.action}
                    </span>
                    <span className="text-[12px] text-secondary-foreground font-medium leading-4 line-clamp-1">
                      {val.description}
                    </span>
                  </div>
                </HRCard>
              </Link>
            );
          })}
        </div>
      </HRCard>
    </>
  );
};
