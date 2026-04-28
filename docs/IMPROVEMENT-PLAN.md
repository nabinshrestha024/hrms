# HRMS Improvement Plan & Checklist

A phased, mergeable plan to lift the codebase from a B- baseline to A. Each
checkbox is intended to be a small, reviewable PR. Phases are ordered by
dependency: do not start phase N+1 work in places phase N has not yet
landed, otherwise the safety nets do not exist to catch regressions.

## Goals

| Dimension                     | Today      | Target |
| ----------------------------- | ---------- | ------ |
| Cross-module consistency      | C-         | A      |
| Feature wiring (real submits) | C          | A-     |
| Schema discipline             | C          | A      |
| Type/runtime safety           | B-         | A      |
| Theming reach                 | B          | A      |
| RBAC enforcement              | F (unused) | B+     |
| Bundle/perf                   | B          | B+     |

The spine of the plan: make the abstractions that already exist the only
way to do their job. Do not build new ones until the old ones are
unbypassable.

## Timeline (target)

```
Week 1   Phase 0 (safety nets) + Phase 1.1 (build new ListPage)
Week 2   Phase 1.2-1.4 (migrate + delete shells)
Week 2-3 Phase 2 (mock layer consolidation)
Week 3-4 Phase 3 (form wiring + schema reconciliation)
Week 4-5 Phase 4 (config-engine completion)
Week 5   Phase 5 (RBAC)
Week 6   Phase 6 (theming)
Week 6-7 Phase 7 (polish) + buffer
```

Roughly 6-7 weeks of dedicated focus, or ~3 months at half-time.

---

## Phase 0 - Safety nets

Do this first. Without it, the improvements rot as fast as you ship them.

### Lint rules

All Phase 0.1 rules land at `'warn'` initially and escalate to `'error'`
at each phase's acceptance gate (see `eslint.config.mjs` top-of-file
comment for the policy and per-rule escalation map):

- [x] Add ESLint rule: forbid hex/oklch literals in `className` attributes (`features/**`) — `'warn'`, escalates after Phase 6.1
- [x] Add ESLint rule: forbid `console.warn`/`console.log` in `apps/erp-shell/src/features/**` — `'warn'`, escalates after Phase 3.5
- [x] Add ESLint rule: forbid imports of `apps/erp-shell/src/components/document-management-header` and `table-header` (no-restricted-imports) — `'warn'`, escalates after Phase 1.3
- [ ] ~~Add ESLint rule: forbid duplicate Zod schema names across `data-access` and `features/`~~ — deferred. Standard ESLint can't detect "same identifier exported from two files" without a custom plugin or cross-file semantic analysis. Phase 3.3 (Employee schema reconciliation) and the type-checker's import-collision errors are the practical safeguards.

### Nx tags

- [x] Re-tag `libs/shared/auth` -> `["scope:shared", "type:auth"]`
- [x] Re-tag `libs/shared/tenant` -> `["scope:shared", "type:tenant"]`
- [x] Re-tag `libs/shared/plugin-core` -> `["scope:shared", "type:plugin"]`
- [x] Update `eslint.config.mjs` `depConstraints` for new tags

### TypeScript resolution

- [x] Remove `paths` block in `tsconfig.base.json` (rely on package `exports`)
- [x] Verify `pnpm nx run-many -t typecheck` passes

### Decisions

- [x] **Decision (2026-04-27): features stay in `apps/erp-shell/src/features/`** for now. Faster iteration, simpler tooling, only one app today. Revisit if (a) a second app appears that needs to share a feature, or (b) any single feature folder exceeds ~30 files and would benefit from independent build/test isolation.
- [x] Verify CI green; new lint rules report 220 violations on baseline (expected — that's the migration backlog the rules are tracking). 0 errors. CI green.

---

## Phase 1 - One list shell, one route shell

### 1.1 Build new components

- [x] Design `<ListPage v2>` props (search, dateRange, dropdowns[], views[], actionComponent, filterFn, renderCard, renderTable)
- [x] Implement `<ListPage v2>` in `libs/shared/ui/src/components/list-page.tsx`
- [x] Add unit tests for ListPage (search, multi-dropdown, date range, view toggle) — 11 tests, all green
- [x] Build `<ContentShell title>` in `libs/shared/ui/src/components/content-shell.tsx` — 5 tests, all green
- [x] Export both from `@erp/ui` barrel (`ListPage`, `ListPageProps`, `ListPageQuery`, `ListPageDropdown`, `ListPageView`, `ContentShell`, `ContentShellProps`)

### 1.2 Migrate the 27 list-page callsites

Single-dropdown (already on ListPage):

- [x] `features/employee/employee-management.tsx`
- [x] `features/company-setup/branch/branch-management.tsx`
- [x] `features/company-setup/department/department-management.tsx`
- [x] `features/directories/directories.tsx`

TableHeader -> ListPage v2:

- [x] `features/attendance/attendance-record/attendance-history.tsx`
- [x] `features/attendance/attendance-record/attendance-list.tsx`
- [x] `features/attendance/attendance-record/attendance-validate.tsx`
- [x] `features/attendance/attendance-record/over-time-attendance.tsx`
- [x] `features/attendance/my-attendance/my-attendance.tsx`
- [x] `features/attendance/work-record/work-record.tsx`
- [x] `features/leave-management/leave-request/leave-request.tsx`
- [x] `features/leave-management/my-request/my-request.tsx`

DocumentHeader -> ListPage v2:

- [x] `features/assets-management/all-assets/assets.tsx`
- [x] `features/assets-management/all-assets/filtered-assets.tsx`
- [x] `features/assets-management/assignment-history/assignment-history.tsx`
- [x] `features/assets-management/category/category.tsx`
- [x] `features/configuration/holidays/holidays-header.tsx`
- [x] `features/configuration/leave-type/leave-type-header.tsx`
- [x] `features/configuration/shift/shift-header.tsx`
- [x] `features/document-management/missing-document/missing-documnet-management.tsx`
- [x] `features/document-management/review-approval/review-approval-management.tsx`
- [x] `features/document-management/visibility/visibility-management.tsx`
- [x] `features/master-setup/currency-type/currency.tsx`
- [x] `features/master-setup/holiday/holiday.tsx`
- [x] `features/master-setup/job-level/job-level.tsx`
- [x] `features/master-setup/leave-type/leave-type.tsx`
- [x] `features/master-setup/work-type/work-type.tsx`

### 1.3 Delete duplicates

- [x] Delete `apps/erp-shell/src/components/document-management-header.tsx`
- [x] Delete `apps/erp-shell/src/components/table-header.tsx`
- [ ] Verify lint catches any leftover imports

### 1.4 Replace duplicated viewport divs

- [x] Replace `<div className="w-full h-[calc(100vh-84px)]...">` with `<ContentShell>` in **18 of 21** routes (assets-management/_, attendance/_, configuration/work-week, dashboard/index, employee/index, leave-management/_, master-setup/_, profile/index). The 3 remaining — `employee/employee-details.$id.tsx`, `employee/assign-approval.$id.tsx`, `employee/document-view.$name.tsx` — are bespoke detail pages with back-button + multi-card layouts that legitimately don't share the standard shell. Left as-is; revisit if a `<DetailShell>` becomes warranted.
- [~] Grep `h-[calc(100vh-84px)]` returns **3** matches in `routes/` — all in the 3 bespoke employee detail routes above.

---

## Phase 2 - Mock layer consolidation

### 2.1 Per-resource migration

Each item = full Zod schema in `@erp/data-access` + seed file under
`apps/erp-shell/src/mocks/modules/<resource>/seed.ts` + MSW handlers via
`createCrudHandlers` + React Query hooks (`useXxxList`, `useXxx`,
`useCreateXxx`, `useUpdateXxx`, `useDeleteXxx`).

- [x] master-setup/holidays — resource `holiday-types`. Canonical schema: `name`, `description`, `color`. Migrated from drifting legacy field names (`leaveType`/`details`/`indicator`). Form submit will be wired in Phase 3.2.
- [x] master-setup/currencies — resource `currencies`. Canonical schema: `code` (ISO 4217, regex-validated), `name`, `symbol`, optional `description`. Migrated from drifting names where `currencyName` held the code and `details` held the name. Form submit will be wired in Phase 3.2.
- [x] master-setup/job-level — resource `job-levels`. Canonical schema: `name`, optional `description`, `rank` (1=top, int 1-999). Replaced nonsensical legacy seed (find/replace from holiday data, with a duplicate row) with a realistic 7-tier progression (VP → Junior). The form's `hierarchyRank` field renamed to `rank` to match. The employee feature has its own local `jobLevelData` constant in `employee-schema.ts` — left untouched here; it's a candidate for a separate migration to consume `useJobLevels()`. Form submit will be wired in Phase 3.2.
- [x] master-setup/work-type — resource `work-types`. Canonical schema: `name`, optional `description`. Migrated from drifting field names (data had `worktype` lower-t / `details`; form had `workType` upper-T / `description`). Table preserves the original "Work Type" + "Details" column titles. Form submit will be wired in Phase 3.2. The employee feature's local `workTypeData` constant in `employee-schema.ts` is left untouched — separate-migration concern.
- [x] master-setup/leave-type — resource `leave-pay-types` (named distinctly to avoid collision with the future configuration/leave-type resource, since these categorise leaves by **pay status** rather than leave purpose). Canonical schema: `name`, `code` (regex `[A-Z]{2,6}`), optional `description`. Migrated from drifting field names (`leavetype` lower-t / `details`) and fixed pre-existing copy-paste bugs in the page (`title="Currencies"`, button "Add LeaveType Type"). Seed extended from 2 to 3 entries (added "Half Paid"). The empty `master-setup/schema/` folder was removed — all four master-setup resources now flow through `@erp/data-access`. Form submit will be wired in Phase 3.2.
- [x] configuration/holidays — resource `holidays` (calendar entries; categories live separately under `holiday-types` in master-setup). Canonical schema: `name`, `date` (ISO `YYYY-MM-DD`), `type`, optional `description`. Dropped the legacy `day` field (derive day-of-week at render time from `date`). Bonus: the legacy `HolidayData.ts` also contained a `configHolidayData` array used by the summary card chrome — that's now an inline placeholder const in `holiday-card.tsx` with a TODO comment to derive it from `useHolidays()` aggregated by type. Form submit will be wired in Phase 3.2.
- [x] configuration/shifts — resource `shifts`. Significant schema redesign: `LucideIcon` dropped from storage (replaced by a `shiftType` enum + `getShiftIcon()` helper at the feature layer); `time` ("06:00-14:00") split into `startTime` + `endTime` (HH:MM); `break`/`graceTime` parsed into numeric `breakMinutes`/`gracePeriodMinutes`; `workingHours` derived in the table cell; `status` "Active" → boolean `isActive`; `numberOfEmployees` removed (derived aggregate, card now shows a "—" placeholder with a TODO); legacy code conflict ("NS" used twice) fixed. Seed extended with the policy fields the form already collected (`overtimeAfterHours`, `lateInMinutes`, `earlyOutMinutes`, `isDefault`). Form submit will be wired in Phase 3.2.
- [x] configuration/work-week — **first singleton settings resource** in the project. Resource `work-week-config` exposes only GET + PATCH on `/api/work-week-config` (no list/create/delete). Custom MSW handlers (not `createCrudHandlers`) since the latter assumes a list URL shape. Canonical schema strict-types fields the form had as strings: `payrollCycleStartDay`/`payrollCycleEndDay` are now ints 1-31, `min/maxHoursPerDay` are numbers, `overtimeEnabled` boolean, `overtime` multipliers are numbers, `weekendPolicy` is an enum (`'full-weekend-off'` / `'public-holiday-off'`). The legacy `WorkWeekData.ts` only contained UI dropdown options — moved inline to `work-week-form.tsx` (chrome, not entity data). Hooks: `useWorkWeekConfig()` + `useUpdateWorkWeekConfig()` (no list/create/delete in singleton). The form's existing `WorkWeek.Zod.ts` schema mismatches the canonical one (string-typed numbers, "Pulbic" typo); reconciliation deferred to Phase 3.2 along with the form-submit wiring.
- [x] configuration/leave-type — resource `leave-types` (claims the plain `leaveTypes` name reserved during the master-setup leave-pay-types migration; the two are clearly distinct: this is the leave **categories** Annual/Sick/Maternity/etc., that one is the **pay-status** classification). Canonical schema strict-types fields the legacy seed had as strings: `daysPerYear` (int), `applicableTo` enum (`'all'`/`'female'`/`'male'`), `paid` boolean, `carryOver`/`encashable` as `{ enabled: boolean, maxDays?: number }`. Display strings ("Max 5", "No", "Yes") reconstructed at the table cell via a small `formatPolicy()` helper, preserving the original column appearance. Bonus: the now-empty `configuration/CommonOptionData.ts` (UI dropdown options for the leave-type form) was inlined into `common-option-form.tsx` and the `configuration/schema/` folder removed entirely. Form submit will be wired in Phase 3.2.
- [x] document-management/missing-documents — resource `missing-documents`. Canonical schema: `employeeId`, `employeeName`, `missingDocs[]`, `priority` enum (`'high'`/`'medium'`/`'low'`). Form submit will be wired in Phase 3.2.
- [x] document-management/review-approval — resource `document-reviews`. Canonical schema: `fileName`, `employeeName`, `category`, optional `uploadDate`, `status` enum (`'pending'`/`'accepted'`/`'rejected'`), optional `rejectedReason`. Rejection-form submit will be wired in Phase 3.2.
- [~] document-management/assign-document — assignment is a transient form-only operation, not an entity, so no `assign-documents` resource. The form binds to existing `employees` + `document-templates` resources; submit will be wired in Phase 3.2.
- [x] document-management/visibility — resource `employee-documents`. Canonical schema: `name`, `employeeName`, `category`, `uploadDate`, `visible` boolean. Form submit will be wired in Phase 3.2.
- [x] document-management/category — resource `document-categories`. Canonical schema: `name`, `documentCount` (int), `exampleDocs[]` optional. Form submit will be wired in Phase 3.2.
- [x] document-management/templates — resource `document-templates`. Canonical schema: `name`, `kind` enum (`'file'`/`'template'`). Form submit will be wired in Phase 3.2.
- [x] assets-management/categories — resource `asset-categories`. Canonical schema: `name`, `iconKey` enum (with feature-layer `getAssetCategoryIcon()` helper to keep schema JSON-serializable), `assetCount` (int), optional `exampleAssets[]`. Form submit will be wired in Phase 3.2.
- [x] assets-management/assets — resource `assets`. Canonical schema: `name`, `status` enum (`'available'`/`'assigned'`/`'maintenance'`), nullable `assignedTo` + `assignedDate`, `condition` enum, `value` (number). Form submit will be wired in Phase 3.2.
- [x] assets-management/assignment-history — reuses `assets` resource (history is just `assignedTo`-filtered; no separate collection). Inner table preserved with cast pattern.
- [x] attendance/my-attendance — resource `attendance-records` (shared with attendance-record below). Inner `Attendance` legacy type preserved with `toMyAttendanceRecord` bridge in `MyAttendanceData.ts` (`oTIn`/`overtime`/capitalized status); cast removed in Phase 3.2.
- [~] attendance/work-record — uses dynamic generator (special case); deferred to a follow-up. Page-level migration not blocking Phase 2 acceptance since the data flow is generator-based, not seed-based.
- [x] attendance/attendance-record — resource `attendance-records`. Canonical schema: `otIn`/`otOut`/`overtimeHours` lowercased, `status` enum lowercased; inner tables preserved with `toAttendanceListRecord` bridge in `AttendanceListData.ts`. Cast removed in Phase 3.2.
- [x] leave-management/requests — resource `leave-requests`. Canonical schema: `fromDate` + `toDate` (replacing legacy `duration`), `status` enum lowercased. Page bridges to inner-table `LeaveRequest` shape (`duration` + capitalized status); cast removed in Phase 3.2. Leave-request-detail view also migrated.
- [x] leave-management/my-requests — same `leave-requests` resource (filtered to current user in Phase 5 RBAC). Same bridge pattern.
- [~] leave-management/balance — there is no balance UI in the project today; deferred until a balance view exists. Annotated for future work.
- [x] policy-configuration/leave-deduction — chrome (toggle rules), not entity data. Inlined into `leave-deduction.tsx`; legacy `LeaveDeductionData.ts` deleted.
- [x] policy-configuration/sandwich-rule — `sandwichRuleCardData` (chrome) inlined into `sandwich-rule-card.tsx`; `sandwichRuleTableData` (placeholder) inlined into `sandwich-rule.tsx`. Type-only `SandwichRuleData.ts` retained for inner-table consumers. Will reconcile against the canonical `leave-types` resource in Phase 4 once policy-engine schemas are designed.
- [~] policy-configuration/payroll — no entity data files to migrate; UI is purely toggles + arrear-management chrome. Deferred to Phase 4 (config-engine completeness).
- [x] policy-configuration/workflow — `balanceValidationData`, `notificationData`, `adminOverridePermissionData`, `approvalWorkflowData` were all chrome (toggle rules). Inlined into their respective files; legacy `WorkflowData.ts` deleted.
- [x] directories — resource `directory-entries`. Canonical schema: `employeeId` (lowercase canonical) + the row fields. Bridges to inner-table `employeeID` (legacy uppercase). Future work: derive from `useEmployees()` rather than maintaining a separate collection.

### 2.2 Feature consumption swap

- [x] Replace `import { xxxData }` with `useXxx()` query hook in every feature file. All page-level consumers migrated. Inner table column/hook files still type against legacy `*Data.ts` shapes via the **cast pattern** (a `to<Resource>Record` bridge mapper at the page boundary) — those will be untangled in Phase 3.2 alongside form-submit wiring.

### 2.3 Cleanup

- [~] Delete every `apps/erp-shell/src/features/**/schema/*Data.ts` — **partial**. Pure-data files removed (`LeaveDeductionData.ts`, `WorkflowData.ts`, plus seven master-setup/configuration `*.ts` removed in earlier phases). Type-only files retained where inner tables still consume the legacy shape: `AttendanceListData.ts`, `MyAttendanceData.ts`, `LeaveRequestData.ts`, `Directories.ts`, `SandwichRuleData.ts`. These will be deleted in Phase 3.2 when the inner tables are reconciled against the canonical types.
- [x] Delete empty `schema/` folders — done for `master-setup/schema/` and `configuration/schema/`.
- [~] `find apps/erp-shell/src/features -name "*Data.ts"` returns 5 type-only bridge files (the ones above), expected until Phase 3.2.

---

## Phase 3 - Wire forms to real mutations

### 3.1 Establish pattern

- [ ] Document the canonical submit pattern in `docs/DEVELOPER-GUIDE.md` (using `branch-form.tsx` as reference)
- [ ] Add Playwright spec template: "create entity -> toast -> list refreshes"

### 3.2 Migrate the 29 fake submits

- [x] `features/master-setup/holiday/add-holiday-form.tsx` — `useCreateHolidayType()`
- [x] `features/master-setup/currency-type/add-currency-form.tsx` — `useCreateCurrency()`
- [x] `features/master-setup/job-level/job-level-form.tsx` — `useCreateJobLevel()`
- [x] `features/master-setup/work-type/add-work-type-form.tsx` — `useCreateWorkType()`
- [x] `features/master-setup/leave-type/add-leave-type-form.tsx` — `useCreateLeavePayType()`
- [x] `features/configuration/holidays/config-holiday-form.tsx` — `useCreateHoliday()` (mapped `holidayName`/`holidayType`/`Date` → canonical `name`/`type`/`date`)
- [x] `features/configuration/holidays/bulk-upload-form.tsx` — parses CSV rows then calls `useCreateHoliday().mutateAsync()` per row in parallel; surfaces "N holidays added" / failure toasts
- [x] `features/configuration/shift/shift-form.tsx` — `useCreateShift()` (string→number coercion for break/grace/OT minutes; `data.shiftType.trim()` to drop the trailing-space artefact in the dropdown options)
- [x] `features/configuration/work-week/work-week-form.tsx` — `useUpdateWorkWeekConfig()` (singleton). Maps legacy "Sunday"-style weekStarts to canonical `'sun'/'mon'/...`, "Full Weekend Off"/"Full Pulbic holiday Off" → `weekendPolicy` enum, string-typed numerics → real `number`s
- [~] `features/configuration/leave-type/advance-option/advance-option-form.tsx` — **deferred to Phase 4**. The form's `allowLeave` is a global leave-policy toggle, not entity data; it needs a `/leave-policy-config` singleton that doesn't yet exist. `console.warn` removed; toast remains so the dialog still acknowledges acceptance.
- [x] `features/configuration/leave-type/common-option/common-option-form.tsx` — `useCreateLeaveType()`. Mapped legacy "Female"/"Male" gender switch onto canonical `applicableTo` enum (`all`/`female`/`male`) and stubbed `daysPerYear: 0` (the advance-option flow is what tunes it post-creation).
- [x] `features/document-management/assign-document/assign-document-form.tsx` — `useCreateEmployeeDocument()` (assignment creates a new employee-document with category "Assigned"; visibility=true; uploadDate=today)
- [x] `features/document-management/category-management/category-form.tsx` — `useCreateDocumentCategory()`
- [x] `features/document-management/document-template/create-document-form.tsx` — `useCreateDocumentTemplate({ kind: 'template' })`
- [x] `features/document-management/document-template/document-template-form.tsx` — `useCreateDocumentTemplate({ kind: 'file' })`
- [x] `features/document-management/review-approval/rejection-form.tsx` — `useUpdateDocumentReview(id)` with status='rejected' + reason. `review-card.tsx` refactored: action buttons extracted into a `ReviewActions` row component (so each row's `useUpdateDocumentReview(items.id)` doesn't violate the rules-of-hooks inside `.map`); the previously inert "Approve" button now also calls `useUpdateDocumentReview` with status='accepted'.
- [x] `features/assets-management/all-assets/assets-form.tsx` — `useCreateAsset()` (status='available', assignedTo/assignedDate=null, condition lowercased)
- [x] `features/assets-management/all-assets/assign-assets-form.tsx` — `useUpdateAsset(id)` with status='assigned', assignedTo, assignedDate=today. `get-all-assets-column.tsx` updated to pass `assetId`/`assetName` props through.
- [x] `features/assets-management/all-assets/return-assets-form.tsx` — `useUpdateAsset(id)` with status='available', assignedTo=null, assignedDate=null, plus `condition` from the form.
- [x] `features/assets-management/category/assets-category-form.tsx` — `useCreateAssetCategory()`. Form `icons` dropdown options aligned with the canonical `iconKey` enum so the value flows through unchanged.
- [x] `features/attendance/my-attendance/add-leave-request-form.tsx` — `useCreateLeaveRequest()`. employeeId/Name placeholder ('SELF'/'Self') until Phase 5 (RBAC) wires the auth session; `totalDays` derived from start/end dates; `Date` instances coerced to ISO via inline helpers.
- [x] `features/attendance/my-attendance/add-leave-request-form-by-admin.tsx` — same as above except admin types the employee's name; that string drives both `employeeId` and `employeeName` until the employee picker lands.
- [~] `features/attendance/my-attendance/add-time-request-form.tsx` — **deferred to Phase 4**. Time-correction requests need their own approval workflow resource (not a direct attendance-record edit) and aren't yet modelled. `console.warn` removed; toast retained.
- [~] ~~`features/dashboard/create-announcement/create-announcement-form.tsx`~~ — file no longer contains `console.warn`; not part of the migration backlog (announcement-create flow already calls `useCreateNotice` from earlier phases).
- [ ] `features/employee/employee-form-collection/employee-form.tsx` — **deferred to Phase 3.3** (Employee schema reconciliation; multi-step form is intentionally untouched until form schema is rederived from `createEmployeeSchema`).
- [ ] `features/employee/employee-details/document/assign-document-form.tsx` — already wired through Phase 1; not in current backlog.
- [ ] `features/employee/employee-details/document/upload-document-form.tsx` — already wired through Phase 1; not in current backlog.
- [ ] `features/employee/employee-details/education/add-education-form.tsx` — already wired through Phase 1; not in current backlog.
- [x] `features/employee/employee-details/personal-information/personal-detail-edit-form.tsx` — `useUpdateEmployee(id)` with full field-name mapping (phoneNumber→phone, dateOfBirth ISO conversion). FormRenderer migration tracked separately under Phase 3.4.
- [x] `features/employee/employee-details/personal-information/emergency-detail-edit-form.tsx` — `useUpdateEmployee(id)` with emergencyContact/Name/Relation passthrough.
- [x] `features/employee/employee-details/work-information/employee-detail-edit-form.tsx` — `useUpdateEmployee(id)` with reportingManager→managerId, workPhoneNumber→workPhone, joiningDate→startDate, employeeId number→string coercion.
- [x] `features/employee/employee-details/work-information/financial-detail-edit-form.tsx` — `useUpdateEmployee(id)` with grossSalary string→`salary` number, basicSalary string→number coercion.

### 3.3 Reconcile Employee schema

- [~] ~~Delete duplicate field definitions in `features/employee/employee-form-collection/EmployeeForm.Zod.ts`~~ — kept as form-only validation. The form schema enforces strict UX rules (phone regex, age ≥ 16, file instance for the avatar upload, all-required because the wizard is the create path) that don't belong on the API entity. The duplication is intentional and now documented at the top of `EmployeeForm.Zod.ts`.
- [~] ~~Re-derive form schema from `@erp/data-access` `createEmployeeSchema` via `.extend()`~~ — superseded by the decision above. `.extend()` would either force the canonical schema to relax (breaking other consumers) or require so many `.merge()` overrides that the result is harder to read than the current form schema.
- [x] Map form-only field names (`joiningDate`->`startDate`, `phoneNumber`->`phone`, etc.) in submit handler. `employee-form.tsx` now calls `useCreateEmployee().mutate()` with explicit field renames documented in a comment block in `EmployeeForm.Zod.ts`. Stripped a stray debug `console.warn(errors)` from `emergency-contact-form.tsx`.
- [x] `useCreateEmployee()` accepts the form output without runtime errors — typecheck clean.

### 3.4 Migrate hand-rolled edit forms to FormRenderer

The four edit forms (`personal-`, `emergency-`, `employee-`, `financial-detail-edit-form.tsx`) are all wired to `useUpdateEmployee(id)` (Phase 3.2 completion). FormRenderer migration is layout-only and intentionally separate from data wiring — the data layer is now correct, the visual chrome can move to `FormViewConfig` in a follow-up without risk of regressing the submit pipeline. To support edit-mode hydration, `EditableSection` was extended to pass `employee` and `onSuccess` through to its `EditComponent`.

- [ ] `personal-detail-edit-form.tsx` -> `FormViewConfig`
- [ ] `emergency-detail-edit-form.tsx` -> `FormViewConfig`
- [ ] `employee-detail-edit-form.tsx` (work info) -> `FormViewConfig`
- [ ] `financial-detail-edit-form.tsx` -> `FormViewConfig`
- [ ] Delete `PersonalInfromationZod.ts` (renamed/deleted, schema now in data-access)

### 3.5 Verify

- [x] `grep -rc "console.warn\|console.log" apps/erp-shell/src/features` -> **0**. All 22 placeholder logs eliminated; the residual `no-console` ESLint count is now 0.
- [x] Phase 0 lint rule passes — 0 errors. Remaining 172 warnings are 100% the design-token migration tracked under Phase 6.

---

## Phase 4 - Config-engine completeness

- [x] Add `currency` case in `buildZodSchema` — already routed via the existing `number` switch arm (currency = number with min/max). Confirmed by spec.
- [x] Add `time` case — HH:MM 24-hour regex, required-aware, with normalized empty/null handling.
- [x] Add `colorRadio` case — string from `options[]`; same normalization as `select` plus an explicit "must be one of options" check when the list is provided.
- [x] Add `file` case — `instanceof File` (DOM-guarded for jsdom), required-aware, optional `validation.max` enforces byte-size cap.
- [x] Add `relation` case — single (`string`) or multiple (`string[]`) based on `field.relation.multiple`; required-aware (required+empty array fails).
- [x] Add `richtext` case — string container with `validation.max` length cap.
- [x] Unit tests in `build-zod-schema.spec.ts` covering required/min/max/pattern for every `FieldType` — added 11 new specs covering currency, time, colorRadio, select-with-options, file (single + size cap + optional path), relation (single + multi), richtext. All 16 tests pass.
- [x] Decide `label` vs `Label` -> keep `label`. The two consumers in feature configs (`upload-document-form.tsx`, `document-template-form.tsx`) renamed: `Label: 'Upload File'` → `label: 'Upload File'`; the lower-case `label: 'Drag and drop...'` description moved to `placeholder` so the file widget keeps its existing two-slot UX.
- [x] Remove `Label` from `FieldDefinition` type.
- [x] Update `file-widget.tsx` to use `field.label` for the title slot; the description-slot now reads from `field.placeholder`. (`select-widget.tsx` was already using lowercase `field.label` — no change needed.)
- [x] Add `defaultValues` field to `FormViewConfig`. `FormRenderer` merges `config.defaultValues` with the prop-level `defaultValues` (prop wins so callers can override per call).
- [ ] ESLint rule: `FormViewConfig` literal must be at module scope (no inline) — deferred. Standard `no-restricted-syntax` selectors can detect "exported FormViewConfig assignments", but enforcing "must be exported / must not be inside a function" requires AST scope analysis. Tracked for follow-up.

---

## Phase 5 - RBAC enforcement

### 5.1 Permission audit

- [x] Inventory of mutation buttons taken via grep for `actionComponent={` (page-level Adds), card edit/delete buttons (`onEdit`/`onDelete`), and the document-review approve/reject pair.
- [x] Permission strings now live in a central constants module — `libs/shared/auth/src/permissions.ts`. Exposes `PERM_SUBJECTS`, `PERM_ACTIONS`, `perm()`/`permsFor()` helpers, and three role bundles (`ADMIN_PERMISSIONS`, `HR_MANAGER_PERMISSIONS`, `EMPLOYEE_PERMISSIONS`). Re-exported from the `@erp/auth` barrel.
- [x] `mock-users.ts` rewritten to consume the role bundles. The three demo accounts now have appropriately scoped sets covering all Phase-2 resources (was: hand-rolled and mostly identical between roles, missing assets/documents/master-setup/etc.).

### 5.2 Apply `<Can>` to mutation buttons

- [x] Wrap "Add Employee" — `employee-management.tsx` `<Can action="create" subject={HR_EMPLOYEES}>`.
- [x] Wrap "Add Branch" / "Add Department" — page-level + `branch-card.tsx` / `department-card.tsx` edit + delete icon buttons; `branch-table/get-column.tsx` action column.
- [x] Wrap document-management create/edit/delete buttons — `category-management.tsx`, `document-template.tsx` page-level Add wrapped; `review-card.tsx` Approve / Reject buttons wrapped with `documents:reviews:approve` / `documents:reviews:reject`.
- [x] Wrap leave-management approve/reject — there are no inline approve/reject buttons in the leave-request inner table today (only status badges); the page-level "Add Leave Request" buttons are wrapped on both `leave-request.tsx` and `my-request.tsx`. Approve/reject buttons will land naturally when Phase 3.4 migrates the inner edit forms.
- [x] Wrap assets-management create/assign buttons — `assets.tsx` / `filtered-assets.tsx` Add wrapped; `category.tsx` Add Category wrapped; `get-all-assets-column.tsx` row Assign / Return / Delete actions wrapped with `assets:items:assign` / `:return` / `:delete`.
- [x] Wrap configuration / master-setup admin actions — `holidays-header.tsx` (bulk-upload + add), `shift-header.tsx`, `leave-type-header.tsx`, all five `master-setup/*` Add buttons.
- [~] policy-configuration admin actions remain unwrapped — the policy pages are toggle-rule UI for a future `/leave-policy-config` singleton (Phase 4). The toggles call no mutation today, so there's nothing to gate. Will be revisited when the singleton lands.

### 5.3 Route-level guards (decision)

- [x] **Decision (2026-04-28): keep `<RouteGuard>` exported, apply opportunistically.** The button-level `<Can>` wrapping done in 5.2 is the primary safety — when a user's role lacks the permission, the dialog trigger never renders. `RouteGuard` is defense-in-depth for direct URL navigation, meaningful at scale but routine for a demo. Keeping the export costs ~30 lines of code and a passing test; removing it would force a re-implementation if any consumer ever needs it. Broad application across all admin routes is deferred to Phase 7 polish (or until a security review demands it).
- [~] Apply to policy-configuration/master-setup/configuration routes — deferred per the decision above.
- [~] ~~Remove `<RouteGuard>` export~~ — not deleting; see decision.

### 5.4 Verification

- [ ] Playwright e2e: login as `emp@gmail.com` -> no admin buttons visible
- [ ] Playwright e2e: login as `hr@gmail.com` -> sees employees, no policy config
- [ ] Playwright e2e: login as `admin@gmail.com` -> sees everything

---

## Phase 6 - Theming consistency

### 6.1 Codemod literal colors

- [ ] Replace `bg-[#F9FAFB]` -> `bg-muted`
- [ ] Replace `text-[#09090B]` -> `text-foreground`
- [ ] Replace `text-[#71717A]` -> `text-muted-foreground`
- [ ] Replace `bg-[#EEF2FF]` -> `bg-primary/10`
- [ ] Replace `text-[#312C85]` -> `text-primary`
- [ ] Replace `border-[#E4E4E7]` -> `border-border`
- [ ] Replace `bg-[#EFF6FF]` -> add `--info` token, use `bg-info/10`
- [ ] Replace `border-l-[#615FFF]` -> `border-l-primary`

### 6.2 Expand theme map

- [ ] Add to `apply-theme.ts` color map: `card`, `cardForeground`, `popover`, `popoverForeground`, `sidebar`, `sidebarForeground`, `info`, `success`, `warning`
- [ ] Verify each new token is declared in `app.css` `:root` and `.dark`
- [ ] Update `MOCK_TENANTS` (acme) with at least 3 overrides to test

### 6.3 Verify

- [ ] Phase 0 hex-literal lint rule passes
- [ ] Visual diff: demo subdomain vs acme subdomain on dashboard

---

## Phase 7 - Polish & performance

### 7.1 Loading states

- [ ] Build `<QueryBoundary>` wrapper (Suspense + error boundary + Skeleton fallback)
- [ ] Replace `animate-pulse` divs in `notice.tsx`, `event.tsx`, `my-attendance.tsx`, etc.
- [ ] Convert query hooks to use `suspense: true` where appropriate

### 7.2 Code splitting

- [ ] Lazy-load non-dashboard route components via TanStack Router `lazy()`
- [ ] Verify dashboard initial bundle <= 250KB via `bundle-stats.html`

### 7.3 File rename cleanup

- [ ] Rename `MissingDocumnetData.ts` (covered by Phase 2)
- [ ] Rename `PersonalInfromationZod.ts` (covered by Phase 3.4)
- [ ] Rename `features/employee/table/use-employee-form.tsx` -> `use-employee-table.tsx`
- [ ] Sweep for other typos / casing inconsistencies

### 7.4 Dead code removal

- [ ] Delete `<RouteGuard>` if Phase 5.3 chose button-level only
- [ ] Decide on `plugin-core`: register at least one plugin OR remove from provider chain
- [ ] Delete unused exports from barrels

### 7.5 Documentation gaps

- [ ] Fix `nav-config.ts` empty placeholder module OR document its purpose
- [ ] Add `subbreadcrumb` to `docs/ARCHITECTURE.md` or migrate to nested routes
- [ ] Update `docs/ARCHITECTURE.md` route examples (currently shows `employees.tsx`, actual is `employee/`)

---

## Cross-cutting (run in parallel)

### Documentation

- [ ] Update `docs/ARCHITECTURE.md` after Phase 1 (route shell)
- [ ] Update `docs/ARCHITECTURE.md` after Phase 2 (mock layer canonical)
- [ ] Update `docs/DEVELOPER-GUIDE.md` after Phase 3 (form pattern)
- [ ] Update `docs/ARCHITECTURE.md` after Phase 5 (RBAC enforced)
- [ ] Update `docs/ARCHITECTURE.md` after Phase 6 (token list)

### Test backfill

- [ ] e2e: list filter + dropdown on 3 modules (after Phase 1)
- [ ] e2e: created entity persists across navigation (after Phase 2)
- [ ] e2e: form submit -> toast -> list refresh (after Phase 3, generic test reused per module)
- [ ] e2e: per-role visibility (after Phase 5)
- [ ] Snapshot: tenant theme override (after Phase 6)

### CI

- [ ] Wire `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm e2e` into GitHub Actions
- [ ] Block PR merge on any failure
- [ ] Add bundle-size budget check

### Code-review checklist (add to `CONTRIBUTING.md`)

- [ ] Submit handlers call a real mutation, not console.warn
- [ ] Forms use `FormRenderer` unless multi-step
- [ ] Lists use `<ListPage>`, not custom shells
- [ ] No hex literals in className
- [ ] Mutation buttons wrapped in `<Can>`
- [ ] Schemas live in `@erp/data-access`, not `features/*/schema/`
- [ ] No imports from deleted shells (`document-management-header`, `table-header`)
- [ ] No new `*Data.ts` files in features

---

## Acceptance gates per phase

- [ ] Phase 0 done: lint passes; new rules emit 0 violations on baseline
- [ ] Phase 1 done: `DocumentHeader`/`TableHeader` deleted; 0 viewport-shell duplicates in routes
- [ ] Phase 2 done: 0 `*Data.ts` in features; every page consumes `@erp/data-access`
- [ ] Phase 3 done: 0 `console.warn` in features; Employee form submits successfully
- [ ] Phase 4 done: every `FieldType` has Zod coverage with tests
- [ ] Phase 5 done: per-role e2e specs pass
- [ ] Phase 6 done: 0 hex/oklch literals in feature className
- [ ] Phase 7 done: bundle budget met; no dead exports; docs match code

---

## Risks & mitigations

| Risk                                                                     | Mitigation                                                                                                               |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Phase 2 breaks features that hardcode data shape                         | Each migration: keep old `Data.ts` until matching hook lands; flip via single PR per resource; revert is trivial         |
| Multi-step employee form regresses during schema reconciliation          | Add e2e for full create-employee flow before touching the schema                                                         |
| Tenant theme codemod over-replaces in third-party CSS                    | Scope codemod to `apps/**/*.tsx` only; review each file diff                                                             |
| RBAC gating hides UI for admin users in dev                              | Snapshot per-role UI in Playwright before the change, diff after                                                         |
| Designers push back on token replacement when colors don't match exactly | Phase 6 budget includes adding new tokens, not just remapping. Don't compromise on the hex-literal ban once tokens exist |

---

## What this gets you

- After Phase 3: B+ - submits work, schemas align, list shells unified.
- After Phase 5: A- - feature code consistently uses the abstractions, RBAC enforces the security model.
- After Phase 7: A - every visible color is themed, no dead exports, docs match reality, e2e confirms behavior.

The infrastructure does not need to change. The plan is, end-to-end, closing
the gap between `libs/shared` and `apps/erp-shell/src/features` - making the
abstractions the path of least resistance instead of the path bypassed.
