import { Grid2X2, List } from 'lucide-react';
import { TabsList, TabsTrigger } from '../../primitives/tabs';

export function TabsFlex() {
  return (
    <TabsList className="h-10 bg-white flex gap-0 p-0 rounded-xl overflow-hidden">
      <TabsTrigger
        value="table"
        className="flex-1 m-0 p-2 rounded-none text-secondary-foreground rounded-l-xl data-[state=active]:text-white border border-primary  data-[state=active]:bg-primary cursor-pointer"
      >
        <List className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="card"
        className="flex-1 m-0 p-2 rounded-none text-secondary-foreground rounded-r-xl data-[state=active]:text-white border border-primary  data-[state=active]:bg-primary cursor-pointer"
      >
        <Grid2X2 className="w-4 h-4" />
      </TabsTrigger>
    </TabsList>
  );
}
