import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  logger,
} from '@nx/devkit';
import * as path from 'path';

interface RouteGeneratorSchema {
  path: string;
  title: string;
  breadcrumb?: string;
  authenticated: boolean;
  table: boolean;
  entityName?: string;
  form: boolean;
  mock: boolean;
  api: boolean;
}

function toKebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function toCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function toPascal(str: string): string {
  const camel = toCamel(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export default async function routeGenerator(tree: Tree, schema: RouteGeneratorSchema) {
  const routePath = schema.path.replace(/^\//, '').replace(/\/$/, '');
  const breadcrumb = schema.breadcrumb || schema.title;
  const authenticated = schema.authenticated ?? true;

  // Derive names
  const pathParts = routePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const entityName = schema.entityName || toPascal(fileName);
  const entityNameCamel = toCamel(toKebab(entityName));
  const componentName = toPascal(fileName) + 'Page';

  // Route file path
  const routeDir = authenticated ? '_authenticated' : '';
  const routeFilePath = joinPathFragments(
    'apps/erp-shell/src/routes',
    routeDir,
    pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : '',
    `${fileName}.tsx`
  );

  // TanStack Router route string
  const tanstackRoute = authenticated
    ? `/_authenticated/${routePath}`
    : `/${routePath}`;

  // Build the route file content
  let content = '';

  if (schema.table) {
    content = buildTableRoute({
      tanstackRoute,
      componentName,
      title: schema.title,
      breadcrumb,
      entityName,
      entityNameCamel,
      routePath,
      hasForm: schema.form,
      hasMock: schema.mock,
    });
  } else if (schema.form) {
    content = buildFormRoute({
      tanstackRoute,
      componentName,
      title: schema.title,
      breadcrumb,
      entityName,
    });
  } else {
    content = buildBasicRoute({
      tanstackRoute,
      componentName,
      title: schema.title,
      breadcrumb,
    });
  }

  // If nested route (e.g. dashboard/analytics), ensure parent is a layout route
  if (pathParts.length > 1) {
    const parentName = pathParts[0];
    const parentFilePath = joinPathFragments(
      'apps/erp-shell/src/routes',
      routeDir,
      `${parentName}.tsx`
    );
    const parentDirIndexPath = joinPathFragments(
      'apps/erp-shell/src/routes',
      routeDir,
      parentName,
      'index.tsx'
    );

    if (tree.exists(parentFilePath) && !tree.exists(parentDirIndexPath)) {
      // Read existing parent content to preserve it as index route
      const existingParentContent = tree.read(parentFilePath, 'utf-8');

      if (existingParentContent && !existingParentContent.includes('<Outlet')) {
        // Convert parent to layout route
        const parentPascal = toPascal(parentName);
        const parentTanstackRoute = authenticated
          ? `/_authenticated/${parentName}`
          : `/${parentName}`;

        // Extract breadcrumb from existing parent if present
        const breadcrumbMatch = existingParentContent.match(/breadcrumb:\s*'([^']+)'/);
        const parentBreadcrumb = breadcrumbMatch ? breadcrumbMatch[1] : parentPascal;

        const layoutContent = `import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('${parentTanstackRoute}')({
  component: ${parentPascal}Layout,
  beforeLoad: () => ({ breadcrumb: '${parentBreadcrumb}' }),
});

function ${parentPascal}Layout() {
  return <Outlet />;
}
`;
        // Move existing content to index.tsx, update its route path
        const indexContent = existingParentContent
          .replace(
            new RegExp(`createFileRoute\\('${parentTanstackRoute.replace('/', '\\/')}'\\)`),
            `createFileRoute('${parentTanstackRoute}/')`
          )
          .replace(/beforeLoad:.*?\{[^}]*\},?\s*/s, '');

        tree.write(parentFilePath, layoutContent);
        tree.write(parentDirIndexPath, indexContent);
        logger.info(`  UPDATE ${parentFilePath} → converted to layout route`);
        logger.info(`  CREATE ${parentDirIndexPath} → moved existing content`);
      }
    }
  }

  tree.write(routeFilePath, content);
  logger.info(`  CREATE ${routeFilePath}`);

  // Generate mock file
  if (schema.mock) {
    const mockPath = joinPathFragments(
      'apps/erp-shell/src/mocks',
      `${toKebab(entityName)}.mock.ts`
    );
    const mockContent = buildMockFile(entityName, entityNameCamel);
    tree.write(mockPath, mockContent);
    logger.info(`  CREATE ${mockPath}`);
  }

  // Generate API hooks
  if (schema.api) {
    const schemaPath = joinPathFragments(
      'libs/shared/data-access/src/schemas',
      `${toKebab(entityName)}.schema.ts`
    );
    const queryPath = joinPathFragments(
      'libs/shared/data-access/src/queries',
      `${toKebab(entityName)}.queries.ts`
    );
    tree.write(schemaPath, buildSchemaFile(entityName));
    tree.write(queryPath, buildQueryFile(entityName, entityNameCamel));
    logger.info(`  CREATE ${schemaPath}`);
    logger.info(`  CREATE ${queryPath}`);
  }

  await formatFiles(tree);

  logger.info('');
  logger.info(`✅ Route generated: ${schema.title}`);
  logger.info(`   Path: ${tanstackRoute}`);
  logger.info(`   File: ${routeFilePath}`);
  if (schema.mock) logger.info(`   Mock: apps/erp-shell/src/mocks/${toKebab(entityName)}.mock.ts`);
  if (schema.api) logger.info(`   API:  libs/shared/data-access/src/schemas/${toKebab(entityName)}.schema.ts`);
}

// ---- Template Builders ----

function buildBasicRoute(opts: {
  tanstackRoute: string;
  componentName: string;
  title: string;
  breadcrumb: string;
}): string {
  return `import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@erp/ui';

export const Route = createFileRoute('${opts.tanstackRoute}')({
  component: ${opts.componentName},
  beforeLoad: () => ({ breadcrumb: '${opts.breadcrumb}' }),
});

function ${opts.componentName}() {
  return (
    <div>
      <PageHeader title="${opts.title}" />
      <div className="px-6">
        <p className="text-muted-foreground">This page is under construction.</p>
      </div>
    </div>
  );
}
`;
}

function buildTableRoute(opts: {
  tanstackRoute: string;
  componentName: string;
  title: string;
  breadcrumb: string;
  entityName: string;
  entityNameCamel: string;
  routePath: string;
  hasForm: boolean;
  hasMock: boolean;
}): string {
  const pluralEntity = pluralize(opts.entityName);
  const mockImportPath = opts.hasMock
    ? `import { mockGet${pluralEntity} } from '${getRelativeMockPath(opts.routePath)}mocks/${toKebabHelper(opts.entityName)}.mock';`
    : '';

  const formImports = opts.hasForm
    ? `\nimport { useState } from 'react';\nimport { FormDialog } from '@erp/ui';\nimport { FormRenderer } from '@erp/config-engine';\nimport type { FormViewConfig } from '@erp/config-engine';`
    : '';

  const formConfig = opts.hasForm
    ? `
// ---- Form Config ----
// TODO: Define your form fields here
const ${opts.entityNameCamel}FormConfig: FormViewConfig = {
  entity: '${opts.entityNameCamel}',
  fields: [
    { name: 'name', type: 'text', label: 'Name', validation: { required: true } },
  ],
  layout: {
    type: 'section',
    title: 'New ${opts.entityName}',
    children: [
      { type: 'field', name: 'name' },
    ],
  },
};
`
    : '';

  const formState = opts.hasForm ? '\n  const [formOpen, setFormOpen] = useState(false);\n' : '';

  const headerAction = opts.hasForm
    ? `<Button onClick={() => setFormOpen(true)}><Plus className="mr-2 size-4" />Add ${opts.entityName}</Button>`
    : `<Button><Plus className="mr-2 size-4" />Add ${opts.entityName}</Button>`;

  const formDialog = opts.hasForm
    ? `

      <FormDialog open={formOpen} onOpenChange={setFormOpen} title="Add ${opts.entityName}">
        <FormRenderer
          config={${opts.entityNameCamel}FormConfig}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setFormOpen(false);
          }}
          submitLabel="Create ${opts.entityName}"
        />
      </FormDialog>`
    : '';

  const fetchFn = opts.hasMock
    ? `mockGet${pluralEntity}`
    : `async (params: FetchParams): Promise<FetchResult<${opts.entityName}>> => {
        // TODO: Replace with real API call
        return { data: [], total: 0 };
      }`;

  return `import { createFileRoute } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import {
  TablePage,
  DataTableColumnHeader,
  Badge,
  Button,
  type RowAction,
  type FetchParams,
  type FetchResult,
} from '@erp/ui';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';${formImports}
${mockImportPath}

export const Route = createFileRoute('${opts.tanstackRoute}')({
  component: ${opts.componentName},
  beforeLoad: () => ({ breadcrumb: '${opts.breadcrumb}' }),
});

// ---- Types ----
// TODO: Move to @erp/data-access schema when ready
interface ${opts.entityName} {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}
${formConfig}
// ---- Columns ----

const columns: ColumnDef<${opts.entityName}, unknown>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'success' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
];

// ---- Row Actions ----

const rowActions: RowAction<${opts.entityName}>[] = [
  { label: 'View', icon: Eye, onClick: (row) => alert(\`View: \${row.id}\`) },
  { label: 'Edit', icon: Pencil, onClick: (row) => alert(\`Edit: \${row.id}\`) },
  { label: 'Delete', icon: Trash2, onClick: (row) => alert(\`Delete: \${row.id}\`), variant: 'destructive', separator: true },
];

// ---- Page ----

function ${opts.componentName}() {${formState}
  return (
    <>
      <TablePage<${opts.entityName}>
        title="${opts.title}"
        columns={columns}
        fetchData={${fetchFn}}
        rowActions={rowActions}
        searchPlaceholder="Search..."
        headerActions={${headerAction}}
      />${formDialog}
    </>
  );
}
`;
}

function buildFormRoute(opts: {
  tanstackRoute: string;
  componentName: string;
  title: string;
  breadcrumb: string;
  entityName: string;
}): string {
  const entityCamel = toCamel(toKebabHelper(opts.entityName));

  return `import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@erp/ui';
import { FormRenderer } from '@erp/config-engine';
import type { FormViewConfig } from '@erp/config-engine';

export const Route = createFileRoute('${opts.tanstackRoute}')({
  component: ${opts.componentName},
  beforeLoad: () => ({ breadcrumb: '${opts.breadcrumb}' }),
});

// TODO: Define your form fields
const ${entityCamel}FormConfig: FormViewConfig = {
  entity: '${entityCamel}',
  fields: [
    { name: 'name', type: 'text', label: 'Name', validation: { required: true } },
    { name: 'description', type: 'text', label: 'Description' },
  ],
  layout: {
    type: 'section',
    title: '${opts.title}',
    children: [
      { type: 'field', name: 'name' },
      { type: 'field', name: 'description' },
    ],
  },
};

function ${opts.componentName}() {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log('Submitted:', data);
  };

  return (
    <div>
      <PageHeader title="${opts.title}" />
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <FormRenderer
            config={${entityCamel}FormConfig}
            onSubmit={handleSubmit}
            submitLabel="Save"
          />
        </div>
      </div>
    </div>
  );
}
`;
}

function buildMockFile(entityName: string, entityNameCamel: string): string {
  const plural = pluralize(entityName);
  const constName = `MOCK_${pluralize(entityName.toUpperCase())}`;

  return `import type { FetchParams, FetchResult } from '@erp/ui';

// ---- Types ----

export interface ${entityName} {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ---- Mock Data ----

const ${constName}: ${entityName}[] = Array.from({ length: 25 }, (_, i) => ({
  id: \`\${i + 1}\`,
  name: \`${entityName} \${i + 1}\`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: new Date(2024, 0, i + 1).toISOString(),
}));

// ---- Mock API ----

async function delay(ms = 100) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function mockGet${plural}(params: FetchParams): Promise<FetchResult<${entityName}>> {
  await delay();

  let filtered = [...${constName}];

  // Search
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(q));
  }

  // Sort
  if (params.sortBy) {
    const key = params.sortBy as keyof ${entityName};
    filtered.sort((a, b) => {
      const aVal = String(a[key]);
      const bVal = String(b[key]);
      return params.sortOrder === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });
  }

  // Paginate
  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return { data, total };
}
`;
}

function buildSchemaFile(entityName: string): string {
  const camel = toCamel(toKebabHelper(entityName));
  return `import { z } from 'zod';

export const ${camel}Schema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
});

export type ${entityName} = z.infer<typeof ${camel}Schema>;

export const create${entityName}Schema = ${camel}Schema.omit({ id: true, createdAt: true });
export type Create${entityName}Input = z.infer<typeof create${entityName}Schema>;

export const update${entityName}Schema = create${entityName}Schema.partial();
export type Update${entityName}Input = z.infer<typeof update${entityName}Schema>;
`;
}

function buildQueryFile(entityName: string, entityNameCamel: string): string {
  return `// TODO: Implement React Query hooks for ${entityName}
// See libs/shared/data-access/src/queries/employee.queries.ts for reference pattern
`;
}

// Helpers

function toKebabHelper(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function pluralize(str: string): string {
  // Already plural-looking words (Analytics, Settings, etc.)
  if (/[sx]$/.test(str) && /[ics|ess|us]$/.test(str)) return str;
  if (str.endsWith('s') || str.endsWith('x') || str.endsWith('z') || str.endsWith('sh') || str.endsWith('ch')) {
    return str + 'es';
  }
  if (str.endsWith('y') && !/[aeiou]y$/i.test(str)) {
    return str.slice(0, -1) + 'ies';
  }
  return str + 's';
}

function getRelativeMockPath(routePath: string): string {
  // Route file lives at: routes/_authenticated/<routePath>.tsx
  // Mock file lives at:  mocks/<name>.mock.ts
  // Need to go up: (pathSegments - 1 for filename) + 2 (for _authenticated + routes) levels to reach src/
  const pathSegments = routePath.split('/').length;
  const depth = pathSegments - 1 + 2; // -1 because last segment is the file, +2 for _authenticated/routes
  return '../'.repeat(depth);
}
