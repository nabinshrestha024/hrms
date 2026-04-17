# Dialog Patterns

This is the reference doc for everything dialog-related in the HRMS app. The
`@erp/ui` library exposes three dialog components — pick the right one for
the situation.

## TL;DR

| Use case                                    | Component                    |
| ------------------------------------------- | ---------------------------- |
| Button → form dialog (95% of cases)         | **`<FormDialog>`**           |
| Dialog opens from a row click with row data | `<ControlledFormDialog>`     |
| Destructive confirmation (delete, archive)  | `<ConfirmDialog>`            |
| Custom modal (image preview, etc.)          | `<Dialog>` (Radix primitive) |

The minimum dialog is **4 lines**. There are no magic strings, no
`useState`, no render-props, no `onSuccess` props. Forms are self-contained
and reusable.

---

## Decision tree

```
Is this a "are you sure?" confirmation (delete, archive, leave page)?
├── YES → <ConfirmDialog>
│
└── NO → Is the dialog opened by a button, with no row data needed?
    │
    ├── YES → <FormDialog>          (default — zero useState)
    │
    └── NO  → <ControlledFormDialog> (parent owns state)
```

---

## A. `<FormDialog>` — the default

Self-managed open state, trigger colocated, sensible defaults.

### Minimum (4 lines)

```tsx
<FormDialog trigger={<Button>Add Branch</Button>} title="Add Branch">
  <BranchForm />
</FormDialog>
```

That's it. No `useState`, no `formId`, no `onSuccess` prop on the form,
no render-prop. The form internally calls `useDialogClose()` to close
itself after a successful save.

### With customization

```tsx
<FormDialog
  trigger={<Button variant="secondary">Add Branch</Button>}
  title="Add Branch"
  size="lg"
  okText="Add" // defaults to "Save"
  cancelText="Cancel" // already the default
>
  <BranchForm />
</FormDialog>
```

### How the form closes itself

Inside the form, call `useDialogClose()` to grab a function that closes
the parent dialog (or a no-op if rendered outside one):

```tsx
import { useDialogClose, Form, HRInput } from '@erp/ui';

export function BranchForm() {
  const createBranch = useCreateBranch();
  const close = useDialogClose();
  const form = useForm({ resolver: zodResolver(branchSchema) });

  const onSubmit = (data: BranchInput) => {
    createBranch.mutate(data, {
      onSuccess: () => {
        toast({ title: 'Branch created', variant: 'success' });
        close(); // closes the parent dialog
      },
      onError: () => {
        toast({ title: 'Failed to save', variant: 'destructive' });
      },
    });
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <HRInput {...form.register('name')} label="Name" />
      <HRInput {...form.register('email')} label="Email" />
    </Form>
  );
}
```

**Notice what's NOT here:**

- No `formId` string
- No `id` attribute on the form (or `<Form>`)
- No `onSuccess` prop
- No `<form id="branch-form">` HTML

The `<Form>` wrapper from `@erp/ui` automatically picks up the form id
from `FormIdContext` (provided by `<FormDialog>`) and applies it to the
inner `<form>` tag. The dialog's submit button is wired to the same id.
**Zero magic strings.**

### Props reference

| Prop                 | Type                                          | Required | Notes                                                                                                                          |
| -------------------- | --------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `trigger`            | `ReactElement`                                | ✓        | The element that opens the dialog. Its existing `onClick` is preserved and fires before the dialog opens.                      |
| `children`           | `ReactNode \| ({ close, open }) => ReactNode` | ✓        | Dialog body. The function form is rarely needed — use it only when the body's render depends on the open/close state directly. |
| `title`              | `ReactNode`                                   |          | Dialog header text.                                                                                                            |
| `size`               | `'sm' \| 'md' \| 'lg' \| 'img'`               |          | Default: `'md'`.                                                                                                               |
| `formId`             | `string`                                      |          | **Rarely needed.** Override the auto-generated form id. Use only when you need a specific id (e.g. for tests, external CSS).   |
| `okText`             | `ReactNode \| null`                           |          | Submit button label. Default: `"Save"`. Pass `null` to hide.                                                                   |
| `cancelText`         | `ReactNode \| null`                           |          | Cancel button label. Default: `"Cancel"`. Pass `null` to hide.                                                                 |
| `onCancel`           | `() => void`                                  |          | Called before close on cancel click.                                                                                           |
| `isSubmitting`       | `boolean`                                     |          | Disables both buttons while a mutation is pending.                                                                             |
| `defaultOpen`        | `boolean`                                     |          | Start open (rare — use for tour onboarding).                                                                                   |
| `onOpenChange`       | `(open: boolean) => void`                     |          | Listen to open/close events.                                                                                                   |
| `dialogClassName`    | `string`                                      |          | Override dialog content classes.                                                                                               |
| `componentClassName` | `string`                                      |          | Override the inner card classes.                                                                                               |

### Trigger preserves existing `onClick`

Want to track an analytics event when the user clicks the trigger? Just put
the handler on the button — it fires first:

```tsx
<FormDialog
  trigger={
    <Button onClick={() => track('clicked_create_branch')}>Create</Button>
  }
  title="Create Branch"
>
  <BranchForm />
</FormDialog>
```

The button's `onClick` runs, then if you don't call `e.preventDefault()`,
the dialog opens.

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
    >
      <BranchForm initialValues={editTarget ?? undefined} />
    </ControlledFormDialog>
  </>
);
```

Same auto-`formId` and `useDialogClose()` behavior as `<FormDialog>`.
The only difference is that the parent owns the open state.

---

## C. `<ConfirmDialog>` — destructive confirmations

Built-in destructive variant, async `onConfirm` with loading state, auto-closes
on success, stays open on error.

```tsx
import { useState } from 'react';
import { ConfirmDialog } from '@erp/ui';

const [target, setTarget] = useState<Branch | null>(null);
const deleteBranch = useDeleteBranch();

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
  onConfirm={async () => {
    if (!target) return;
    await deleteBranch.mutateAsync(target.id);
  }}
/>;
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

## How the auto-`formId` wiring works

You don't need to know this to use the dialogs, but it's helpful for
debugging.

1. `<FormDialog>` calls `React.useId()` → React returns a stable id like `:r5:`
2. Wraps children in `<FormIdContext.Provider value=":r5:">`
3. Renders the submit button with `<button form=":r5:" type="submit">`
4. Inside the dialog, the `<Form>` wrapper from `@erp/ui` calls `useFormId()` → gets `":r5:"`
5. Renders `<form id=":r5:">`
6. When the user clicks the submit button, the browser submits the form with the matching id

**Both ids come from the same `useId()` call**, so they can never get out of sync.

If you don't use `<Form>` from `@erp/ui` (e.g. raw `<form>` tag), pass an
explicit `formId` to `<FormDialog>` and use the same string as your form's
`id` attribute:

```tsx
<FormDialog formId="my-form" trigger={<Button>Add</Button>} title="Add">
  <form id="my-form" onSubmit={handleSubmit}>
    ...
  </form>
</FormDialog>
```

But the recommended pattern is to use `<Form>` from `@erp/ui` and let the
auto-id handle it.

---

## Hooks

### `useDialogClose()`

Returns a function that closes the nearest enclosing dialog. Returns a
no-op when called outside a dialog (so the form can be rendered standalone
without breaking).

```tsx
const close = useDialogClose();

const onSubmit = (data) => {
  mutation.mutate(data, {
    onSuccess: () => {
      toast({ title: 'Saved' });
      close();
    },
  });
};
```

### `useFormId()` (advanced)

Returns the form id provided by the nearest enclosing dialog, or
`undefined` if rendered outside one. Rarely needed in feature code — the
`<Form>` wrapper handles this automatically. Use only if you're building
your own form wrapper.

```tsx
const formId = useFormId();

return (
  <form id={formId} onSubmit={handleSubmit}>
    ...
  </form>
);
```

---

## Common mistakes

### 1. Using `mutate()` instead of `mutateAsync()` in `ConfirmDialog`

`ConfirmDialog` depends on the promise to show its loading state and decide
when to auto-close. Using `mutate()` skips both:

```tsx
// ❌ closes immediately, no loading state, errors silently ignored
onConfirm={() => deleteMutation.mutate(id)}

// ✅ awaits the promise, dialog stays open if it throws
onConfirm={async () => {
  await deleteMutation.mutateAsync(id);
}}
```

### 2. Closing the dialog before the mutation finishes

User sees the dialog disappear while their data is still being saved, with
no feedback if it fails.

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
      toast({ title: 'Saved', variant: 'success' });
      close();
    },
    onError: () => {
      toast({ title: 'Failed to save', variant: 'destructive' });
    },
  });
};
```

### 3. Forgetting to use `<Form>` from `@erp/ui`

If you use a raw `<form>` tag inside a dialog, you have to pass an explicit
`formId` to the dialog AND set the matching `id` on the `<form>` tag —
defeating the auto-id system.

```tsx
// ❌ raw form, manual formId required (and easy to typo)
<FormDialog formId="my-form" trigger={<Button>Add</Button>} title="Add">
  <form id="my-form" onSubmit={handleSubmit}>...</form>
</FormDialog>

// ✅ <Form> from @erp/ui auto-resolves the id from context
<FormDialog trigger={<Button>Add</Button>} title="Add">
  <Form form={rhfForm} onSubmit={handleSubmit}>...</Form>
</FormDialog>
```

### 4. Storing JSX in state

Don't pass JSX through React state or stores. Components live in the render
tree.

```tsx
// ❌ JSX in state — closures get captured at click time
const [content, setContent] = useState<ReactNode>(null);
<Button onClick={() => setContent(<EditForm row={row} />)}>Edit</Button>

// ✅ Dialog lives in the render tree, controlled by data
<ControlledFormDialog open={editTarget !== null} ...>
  <EditForm row={editTarget} />
</ControlledFormDialog>
```

---

## Real examples in the codebase

| File                                                                                     | Pattern shown                                                                               |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `apps/erp-shell/src/features/dashboard/notice.tsx`                                       | `<FormDialog trigger>` for "Create Announcement"                                            |
| `apps/erp-shell/src/features/company-setup/branch/branch-management.tsx`                 | All three: `FormDialog` (Add), `ControlledFormDialog` (Edit), `ConfirmDialog` (Delete)      |
| `apps/erp-shell/src/features/company-setup/department/department-management.tsx`         | Same as branch — all three patterns                                                         |
| `apps/erp-shell/src/features/dashboard/create-announcement/create-announcement-form.tsx` | Form using `useDialogClose()`                                                               |
| `apps/erp-shell/src/features/employee/employee-details/leave-balance.tsx`                | `<FormDialog>` with custom dialog/component classes                                         |
| `apps/erp-shell/src/features/employee/table/getEmployeeColumn.tsx`                       | `<FormDialog>` rendered per-row inside a table cell (each row gets its own dialog instance) |

Read these files when you need a working reference.
