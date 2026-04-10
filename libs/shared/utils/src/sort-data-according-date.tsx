type Props<T> = {
  events: T[];
  limit: number;
  dateKey: keyof T;
};

export function getSortData<T>({ events, limit, dateKey }: Props<T>): T[] {
  return [...events]
    .sort(
      (a, b) =>
        new Date(a[dateKey] as string).getTime() -
        new Date(b[dateKey] as string).getTime()
    )
    .slice(0, limit);
}
