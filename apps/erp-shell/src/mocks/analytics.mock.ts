import type { FetchParams, FetchResult } from '@erp/ui';

// ---- Types ----

export interface Analytics {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ---- Mock Data ----

const MOCK_ANALYTICS: Analytics[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Analytics ${i + 1}`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: new Date(2024, 0, i + 1).toISOString(),
}));

// ---- Mock API ----

async function delay(ms = 100) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function mockGetAnalytics(
  params: FetchParams
): Promise<FetchResult<Analytics>> {
  await delay();

  let filtered = [...MOCK_ANALYTICS];

  // Search
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(q));
  }

  // Sort
  if (params.sortBy) {
    const key = params.sortBy as keyof Analytics;
    filtered.sort((a, b) => {
      const aVal = String(a[key]);
      const bVal = String(b[key]);
      return params.sortOrder === 'desc'
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal);
    });
  }

  // Paginate
  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return { data, total };
}
