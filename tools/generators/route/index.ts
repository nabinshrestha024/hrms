import { Tree, formatFiles, joinPathFragments, logger } from '@nx/devkit';

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

export default async function routeGenerator(
  tree: Tree,
  schema: RouteGeneratorSchema
) {
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
  let content: string;

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
        const breadcrumbMatch = existingParentContent.match(
          /breadcrumb:\s*'([^']+)'/
        );
        const parentBreadcrumb = breadcrumbMatch
          ? breadcrumbMatch[1]
          : parentPascal;

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
            new RegExp(
              `createFileRoute\\('${parentTanstackRoute.replace(
                '/',
                '\\/'
              )}'\\)`
            ),
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
  if (schema.mock)
    logger.info(
      `   Mock: apps/erp-shell/src/mocks/${toKebab(entityName)}.mock.ts`
    );
  if (schema.api)
    logger.info(
      `   API:  libs/shared/data-access/src/schemas/${toKebab(
        entityName
      )}.schema.ts`
    );
}

// ---- Template Builders ----

function buildBasicRoute(opts: {
  tanstackRoute: string;
  componentName: string;
  title: string;
  breadcrumb: string;
}): string {
  return `import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@erp/ui';

export const Route = createFileRoute('${opts.tanstackRoute}')({
  component: ${opts.componentName},
  beforeLoad: () => ({ breadcrumb: '${opts.breadcrumb}' }),
});

function ${opts.componentName}() {
  return (
    <div>
      <PageHeading title="${opts.title}" />
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
    ? `import { MOCK_${pluralize(
        opts.entityName.toUpperCase()
      )} } from '${getRelativeMockPath(opts.routePath)}mocks/${toKebabHelper(
        opts.entityName
      )}.mock';`
    : '';

  const formImports = opts.hasForm
    ? `\nimport { FormDialog } from '@erp/ui';\nimport { FormRenderer } from '@erp/config-engine';\nimport type { FormViewConfig } from '@erp/config-engine';`
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

  const headerAction = opts.hasForm
    ? `<FormDialog
            trigger={<Button><Plus className="mr-2 size-4" />Add ${opts.entityName}</Button>}
            title="Add ${opts.entityName}"
            okText="Create"
          >
            <FormRenderer
              config={${opts.entityNameCamel}FormConfig}
              onSubmit={(data) => {
                console.log('Form submitted:', data);
              }}
              isDialogForm
            />
          </FormDialog>`
    : `<Button><Plus className="mr-2 size-4" />Add ${opts.entityName}</Button>`;

  const dataSource = opts.hasMock
    ? `MOCK_${pluralize(opts.entityName.toUpperCase())}`
    : `[] as ${opts.entityName}[] /* TODO: replace with useYourQuery() */`;

  return `import { createFileRoute } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ListPage,
  DataTable,
  DataTableColumnHeader,
  Badge,
  Button,
  useServerTableState,
} from '@erp/ui';
import { Plus } from 'lucide-react';${formImports}
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

// ---- Card view ----

function ${opts.entityName}Card({ data }: { data: ${opts.entityName}[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
      {data.map((item) => (
        <div key={item.id} className="rounded-xl border border-border bg-card p-4">
          <p className="font-medium">{item.name}</p>
          <Badge variant={item.status === 'active' ? 'success' : 'secondary'}>
            {item.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}

// ---- Table view ----

function ${opts.entityName}Table({ data }: { data: ${opts.entityName}[] }) {
  const { table } = useServerTableState<${opts.entityName}>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="px-6">
      <DataTable table={table} columns={columns} />
    </div>
  );
}

// ---- Page ----

function ${opts.componentName}() {
  const data = ${dataSource};

  return (
    <ListPage<${opts.entityName}>
      title="${opts.title}"
      isTabs
      data={data}
      actionComponent={${headerAction}}
      renderCard={(filtered) => <${opts.entityName}Card data={filtered} />}
      renderTable={(filtered) => <${opts.entityName}Table data={filtered} />}
      filterFn={(rows, search) =>
        rows.filter((row) =>
          row.name.toLowerCase().includes(search.toLowerCase())
        )
      }
    />
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
import { PageHeading } from '@erp/ui';
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
      <PageHeading title="${opts.title}" />
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

function buildMockFile(entityName: string, _entityNameCamel: string): string {
  const constName = `MOCK_${pluralize(entityName.toUpperCase())}`;

  return `// ---- Types ----

export interface ${entityName} {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ---- Mock Data ----

export const ${constName}: ${entityName}[] = Array.from({ length: 25 }, (_, i) => ({
  id: \`\${i + 1}\`,
  name: \`${entityName} \${i + 1}\`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: new Date(2024, 0, i + 1).toISOString(),
}));
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

function buildQueryFile(entityName: string, _entityNameCamel: string): string {
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
  if (
    str.endsWith('s') ||
    str.endsWith('x') ||
    str.endsWith('z') ||
    str.endsWith('sh') ||
    str.endsWith('ch')
  ) {
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
