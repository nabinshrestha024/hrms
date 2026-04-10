# Dialog Patterns

This is the reference doc for everything dialog-related in the HRMS app. The
`@erp/ui` library exposes three dialog primitives — pick the right one for
the situation.

## TL;DR

| Use case                                    | Component                                   |
| ------------------------------------------- | ------------------------------------------- |
| Button → form dialog (95% of cases)         | **`<FormDialog>`**                          |
| Dialog opens from a row click with row data | `<ControlledFormDialog>`                    |
| Destructive confirmation (delete, archive)  | `<ConfirmDialog>`                           |
| Custom modal (image preview, etc.)          | `<Dialog>` (Radix primitive)                |
| ❌ **Don't use**                            | `<LegacyFormDialog>` / `useDialogFormStore` |

---

## Decision tree

```
Is this a "are you sure?" confirmation (delete, archive, leave page)?
├── YES → <ConfirmDialog>
│
└── NO → Is the dialog opened by a button, with no row data needed?
    │
    ├── YES → <FormDialog>          (zero useState — the default)
    │
    └── NO  → <ControlledFormDialog> (parent owns state)
```

---

## A. `<FormDialog>` — the default

Self-managed open state, trigger colocated, render-prop access to `close`.
**No `useState` needed.**

### Basic usage

```tsx
import { Button, FormDialog } from '@erp/ui';
import { BranchForm } from './branch-form';

<FormDialog
  trigger={<Button variant="secondary">Add Branch</Button>}
  title="Add Branch"
  size="lg"
  formId="branch-form"
  okText="Add"
  cancelText="Cancel"
>
  {({ close }) => <BranchForm onSuccess={close} />}
</FormDialog>;
```

### Without `close` (read-only or self-closing form)

```tsx
<FormDialog trigger={<Button>View</Button>} title="Details" formId="view-form">
  <ReadOnlyForm />
</FormDialog>
```

### Props reference

| Prop                 | Type                                          | Required | Notes                                                                                                     |
| -------------------- | --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `trigger`            | `ReactElement`                                | ✓        | The element that opens the dialog. Its existing `onClick` is preserved and fires before the dialog opens. |
| `children`           | `ReactNode \| ({ close, open }) => ReactNode` | ✓        | Dialog body. Use the function form when the form needs to close itself.                                   |
| `title`              | `ReactNode`                                   |          | Dialog header text.                                                                                       |
| `size`               | `'sm' \| 'md' \| 'lg' \| 'img'`               |          | Default: `'md'`.                                                                                          |
| `formId`             | `string`                                      |          | The `id` of the inner `<form>`. The submit button uses `form="<formId>"` to submit.                       |
| `okText`             | `ReactNode`                                   |          | Submit button label. Omit to hide the button.                                                             |
| `cancelText`         | `ReactNode`                                   |          | Cancel button label. Omit to hide.                                                                        |
| `onCancel`           | `() => void`                                  |          | Called before close on cancel click.                                                                      |
| `isSubmitting`       | `boolean`                                     |          | Disables both buttons while a mutation is pending.                                                        |
| `defaultOpen`        | `boolean`                                     |          | Start open (rare — use for tour onboarding).                                                              |
| `onOpenChange`       | `(open: boolean) => void`                     |          | Listen to open/close events.                                                                              |
| `dialogClassName`    | `string`                                      |          | Override dialog content classes.                                                                          |
| `componentClassName` | `string`                                      |          | Override the inner card classes.                                                                          |

### How `formId` works

The submit button inside `<FormDialog>` uses HTML's `form="<id>"` attribute,
which lets a button submit a form anywhere on the page. Make sure your form's
`id` attribute matches the `formId` prop:

```tsx
// Inside the form component
<form id="branch-form" onSubmit={form.handleSubmit(onSubmit)}>
  ...
</form>

// Outside, in the dialog
<FormDialog formId="branch-form" okText="Save">
  <BranchForm />
</FormDialog>
```

If you use `<FormRenderer>` from `@erp/config-engine`, the form id is
auto-generated from the entity name: `${config.entity}-form`. So a config with
`entity: 'branch'` produces `<form id="branch-form">`, and you'd pass
`formId="branch-form"` to the dialog.

### How to close the dialog after a successful submit

Wire `close` from the render-prop into your form's `onSuccess` callback:

```tsx
function BranchForm({ onSuccess }: { onSuccess?: () => void }) {
  const createBranch = useCreateBranch();

  return (
    <form
      id="branch-form"
      onSubmit={form.handleSubmit((data) =>
        createBranch.mutate(data, {
          onSuccess: () => {
            toast({ variant: 'success', title: 'Saved' });
            onSuccess?.();
          },
          onError: () => {
            toast({ variant: 'destructive', title: 'Failed to save' });
          },
        })
      )}
    >
      ...
    </form>
  );
}

<FormDialog
  trigger={<Button>Add Branch</Button>}
  title="Add Branch"
  formId="branch-form"
  okText="Save"
>
  {({ close }) => <BranchForm onSuccess={close} />}
</FormDialog>;
```

### Why the trigger pattern is better than `useState`

**Before** — manual state management (10 lines):

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Add</Button>

<ControlledFormDialog
  open={open}
  onOpenChange={setOpen}
  title="Add"
  formId="x-form"
  okText="Save"
>
  <MyForm onSuccess={() => setOpen(false)} />
</ControlledFormDialog>
```

**After** — self-managed (5 lines):

```tsx
<FormDialog
  trigger={<Button>Add</Button>}
  title="Add"
  formId="x-form"
  okText="Save"
>
  {({ close }) => <MyForm onSuccess={close} />}
</FormDialog>
```

### Trigger preserves existing `onClick`

Want to track an analytics event when the user clicks the trigger? Just put
the handler on the button — it fires first:

```tsx
<FormDialog
  trigger={
    <Button onClick={() => track('clicked_create_branch')}>Create</Button>
  }
  title="Create Branch"
  formId="branch-form"
  okText="Add"
>
  <BranchForm />
</FormDialog>
```

The button's `onClick` runs, then if you don't call `e.preventDefault()`, the
dialog opens.

---

## B. `<ControlledFormDialog>` — parent-owned state

Use this when the dialog's open state depends on **which row** was clicked,
because `<FormDialog>` doesn't expose its internal state.

```tsx
import { useState } from 'react';
import { ControlledFormDialog } from '@erp/ui';

const [editTarget, setEditTarget] = useState<Branch | null>(null);

return (
  <>
    <BranchTable onEdit={(branch) => setEditTarget(branch)} />

    <ControlledFormDialog
      open={editTarget !== null}
      onOpenChange={(open) => !open && setEditTarget(null)}
      title="Edit Branch"
      size="lg"
      formId="branch-form"
      okText="Save"
      cancelText="Cancel"
    >
      <BranchForm initialValues={editTarget ?? undefined} />
    </ControlledFormDialog>
  </>
);
```

Same prop API as `FormDialog` minus `trigger` and `defaultOpen`, plus the
required `open` and `onOpenChange` controlled-state props.

---

## C. `<ConfirmDialog>` — destructive confirmations

Built-in destructive variant, async `onConfirm` with loading state, auto-closes
on success, stays open on error.

```tsx
import { useState } from 'react';
import { ConfirmDialog } from '@erp/ui';

const [target, setTarget] = useState<Branch | null>(null);
const deleteBranch = useDeleteBranch();

const confirmDelete = async () => {
  if (!target) return;
  await deleteBranch.mutateAsync(target.id, {
    onSuccess: () => toast({ variant: 'success', title: 'Branch deleted' }),
    onError: () => toast({ variant: 'destructive', title: 'Failed to delete' }),
  });
};

return (
  <>
    <BranchTable
      onDelete={(id) => setTarget(branches.find((b) => b.id === id))}
    />

    <ConfirmDialog
      open={target !== null}
      onOpenChange={(open) => !open && setTarget(null)}
      title="Delete branch?"
      description={
        target
          ? `"${target.branch}" will be permanently deleted. This action cannot be undone.`
          : undefined
      }
      confirmText="Delete"
      destructive
      onConfirm={confirmDelete}
    />
  </>
);
```

### Props reference

| Prop           | Type                          | Required | Notes                                                                                                                                |
| -------------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `open`         | `boolean`                     | ✓        | Controlled state.                                                                                                                    |
| `onOpenChange` | `(open: boolean) => void`     | ✓        | Close handler.                                                                                                                       |
| `title`        | `string`                      |          | Default: `'Are you sure?'`                                                                                                           |
| `description`  | `ReactNode`                   |          | Body text — explain what's about to happen.                                                                                          |
| `confirmText`  | `string`                      |          | Default: `'Confirm'`.                                                                                                                |
| `cancelText`   | `string`                      |          | Default: `'Cancel'`.                                                                                                                 |
| `destructive`  | `boolean`                     |          | Shows red icon + red confirm button. Use for delete/destroy actions.                                                                 |
| `onConfirm`    | `() => void \| Promise<void>` | ✓        | Sync or async. The dialog shows loading state while a returned promise is pending and auto-closes on resolve. Throw to keep it open. |

### Async behavior

- **Pending** — confirm button shows `Working…`, both buttons disabled
- **Resolved** — dialog auto-closes
- **Rejected** — dialog stays open (user can retry or cancel)

⚠️ **Use `mutateAsync()`, not `mutate()`** — `ConfirmDialog` relies on the
returned promise. If you call `mutate()`, the dialog closes immediately and
ignores errors.

```tsx
// ❌ closes immediately, no loading state, errors silently ignored
onConfirm={() => deleteMutation.mutate(id)}

// ✅ awaits the promise, dialog stays open if it throws
onConfirm={async () => {
  await deleteMutation.mutateAsync(id);
}}
```

---

## D. Custom modals — `<Dialog>` (Radix primitive)

For non-form modals (image preview, info panels, etc.):

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@erp/ui';

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Image preview</DialogTitle>
    </DialogHeader>
    <img src={url} alt="" />
  </DialogContent>
</Dialog>;
```

---

## ⚠️ Don't use `<LegacyFormDialog>` / `useDialogFormStore`

The `useDialogFormStore` hook and `<LegacyFormDialog />` are **deprecated**.
They exist only because the legacy `/features/employee/` tree still calls
`useDialogFormStore().onOpen({ component: <X /> })`.

### Why they're bad

| Concern                             | Legacy global store                          | New `<FormDialog>`                    |
| ----------------------------------- | -------------------------------------------- | ------------------------------------- |
| **State location**                  | Global Zustand store                         | Local `useState` (hidden inside)      |
| **Closures captured at click time** | Yes — stale data risk                        | No — re-evaluated every render        |
| **Nested dialogs**                  | Impossible (one at a time, app-wide)         | Works                                 |
| **Discoverability**                 | Grep the codebase to find what's mounting it | Right next to the trigger             |
| **Testability**                     | Need to mount global `<LegacyFormDialog />`  | `render(<FormDialog defaultOpen>...)` |
| **Type-safe close-after-submit**    | Side-effect via store                        | Render prop `({ close })`             |
| **JSX in state**                    | Yes — anti-pattern                           | No — components in render tree        |
| **Lines of code per dialog**        | ~12 lines + JSX in click handler             | ~5 lines                              |

If you see `useDialogFormStore().onOpen(...)` in a PR, **push back** and ask
the author to use one of the three patterns above.

---

## Common mistakes

### 1. Forgetting `formId`

The submit button has nothing to submit:

```tsx
// ❌ formId missing — button does nothing
<FormDialog trigger={<Button>Add</Button>} title="Add" okText="Save">
  <form onSubmit={handleSubmit}>...</form>
</FormDialog>

// ✅ formId matches the inner form's id
<FormDialog trigger={<Button>Add</Button>} title="Add" formId="my-form" okText="Save">
  <form id="my-form" onSubmit={handleSubmit}>...</form>
</FormDialog>
```

### 2. Closing the dialog before the mutation finishes

User sees the dialog disappear while their data is still being saved, with no
feedback if it fails.

```tsx
// ❌ closes immediately, user has no idea if save succeeded
const handleSubmit = (data) => {
  createBranch.mutate(data);
  close();
};

// ✅ close in the mutation's onSuccess callback
const handleSubmit = (data) => {
  createBranch.mutate(data, {
    onSuccess: () => {
      toast({ variant: 'success', title: 'Saved' });
      close();
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Failed to save' });
    },
  });
};
```

### 3. Using `<ConfirmDialog>` for non-destructive prompts

The destructive variant is opt-in via the `destructive` prop. Without it, the
confirm button uses the secondary variant — which is correct for
archive/restore prompts.

```tsx
// Destructive (red icon, red button)
<ConfirmDialog destructive title="Delete branch?" ... />

// Non-destructive (no icon, secondary button)
<ConfirmDialog title="Archive branch?" ... />
```

### 4. Storing JSX in state

This was the legacy pattern's biggest mistake. Don't reintroduce it.

```tsx
// ❌ JSX in a click handler that mutates external state
<Button
  onClick={() => {
    openDialog({
      title: 'Edit',
      component: <EditForm row={row} />, // closure captures `row` at click time
    });
  }}
>
  Edit
</Button>

// ✅ Dialog lives in the render tree, controlled by state
<ControlledFormDialog open={editTarget !== null} ...>
  <EditForm row={editTarget} />
</ControlledFormDialog>
```

### 5. Trying to open multiple dialogs from the same useDialogFormStore

You can't — the legacy store only holds one dialog at a time. The fix is to
use `<FormDialog>` or `<ControlledFormDialog>`, which let you have as many
dialogs as you want.

---

## Real examples in the codebase

| File                                                                             | Pattern shown                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `apps/erp-shell/src/features/dashboard/notice.tsx`                               | `<FormDialog trigger>` for "Create Announcement"                                       |
| `apps/erp-shell/src/features/company-setup/branch/branch-management.tsx`         | All three: `FormDialog` (Add), `ControlledFormDialog` (Edit), `ConfirmDialog` (Delete) |
| `apps/erp-shell/src/features/company-setup/department/department-management.tsx` | Same as branch — all three patterns                                                    |

Read these files when you need a working reference.
