/**
 * In-memory database for mock API.
 * All CRUD operations persist during the dev session.
 * Each module registers a collection with seed data.
 */

export class MockDatabase {
  private collections = new Map<string, unknown[]>();
  private idCounters = new Map<string, number>();

  registerCollection<T>(name: string, seed: T[]): void {
    this.collections.set(name, [...seed]);
  }

  getAll<T>(collection: string): T[] {
    return (this.collections.get(collection) as T[]) ?? [];
  }

  findById<T extends { id: string }>(collection: string, id: string): T | undefined {
    return this.getAll<T>(collection).find((item) => item.id === id);
  }

  nextId(collection: string, prefix: string): string {
    const current = this.idCounters.get(collection) ?? this.getAll(collection).length;
    const next = current + 1;
    this.idCounters.set(collection, next);
    return `${prefix}-${String(next).padStart(3, '0')}`;
  }

  create<T extends { id: string }>(collection: string, item: T): T {
    this.getAll(collection).push(item);
    return item;
  }

  update<T extends { id: string }>(collection: string, id: string, patch: Partial<T>): T | null {
    const items = this.getAll<T>(collection);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const updated = { ...items[index], ...patch } as T;
    items[index] = updated;
    return updated;
  }

  delete(collection: string, id: string): boolean {
    const items = this.getAll<{ id: string }>(collection);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }

  /**
   * Query with filtering, sorting, and pagination.
   * Reusable across all modules — no module needs its own pagination logic.
   */
  query<T>(
    collection: string,
    opts: {
      filter?: (item: T) => boolean;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
      page?: number;
      pageSize?: number;
    } = {},
  ) {
    let items = this.getAll<T>(collection);

    if (opts.filter) {
      items = items.filter(opts.filter);
    }

    if (opts.sortBy) {
      const key = opts.sortBy as keyof T;
      const order = opts.sortOrder === 'desc' ? -1 : 1;
      items = [...items].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * order;
        return String(aVal).localeCompare(String(bVal)) * order;
      });
    }

    const page = opts.page ?? 1;
    const pageSize = opts.pageSize ?? 10;
    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = items.slice(start, start + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  clear(): void {
    this.collections.clear();
    this.idCounters.clear();
  }
}

export const db = new MockDatabase();
