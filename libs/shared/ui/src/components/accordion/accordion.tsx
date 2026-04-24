import { cn } from '@erp/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../primitives/accordion';

type HRAccordionCardProps = {
  value: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
};

export const HRAccordionCard = ({
  value,
  title,
  children,
  triggerClassName,
  contentClassName,
  defaultOpen = false,
}: HRAccordionCardProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className="w-full space-y-3"
    >
      <AccordionItem value={value}>
        <AccordionTrigger
          className={cn(
            `w-full flex items-center justify-between px-0 py-0 border-b-none transition-all duration-200 hover:cursor-pointer ${triggerClassName}`
          )}
        >
          <div className="text-sm font-bold text-foreground">{title}</div>
        </AccordionTrigger>

        <AccordionContent className={`pb-0 ${contentClassName}`}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
