// Shell layout components
export { MobileNav } from './components/mobile-nav';
export { IconBar } from './components/sidebar/icon-bar';
export { ShellLayout } from './components/sidebar/shell-layout';
export type { NavLinkProps } from './components/sidebar/shell-layout';
export { SubNav } from './components/sidebar/sub-nav';
export { TopBar } from './components/sidebar/top-bar';
export { findActiveModule, navModules } from './lib/nav-config';
export type { NavModule, NavSubItem } from './lib/nav-config';
export { getVisibleModules } from './lib/get-visible-role';

// Hooks
export { useIsMobile } from './hooks/use-mobile';

// Primitives exported directly (ERP wrappers come in later phases)
export { Avatar, AvatarFallback, AvatarImage } from './primitives/avatar';
export { Button, buttonVariants } from './primitives/button';
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './primitives/dropdown-menu';
export { Input } from './primitives/input';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './primitives/select';
export { Separator } from './primitives/separator';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './primitives/sheet';
export { Skeleton } from './primitives/skeleton';
export { Switch } from './primitives/switch';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './primitives/table';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './primitives/toast';
export type { ToastActionElement } from './primitives/toast';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './primitives/tooltip';

// Hooks – toast
export { dismiss, toast, useToast } from './hooks/use-toast';

// Hooks – data table
export { useDataTable } from './hooks/use-data-table';
export type {
  UseDataTableProps,
  UseDataTableReturn,
} from './hooks/use-data-table';
export { useServerTableState } from './hooks/use-server-table-state';
export type {
  UseServerTableStateOptions,
  UseServerTableStateReturn,
} from './hooks/use-server-table-state';

export { Badge, badgeVariants } from './primitives/badge';
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './primitives/breadcrumb';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './primitives/card';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './primitives/dialog';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './primitives/tabs';
export { Alert, AlertTitle, AlertDescription } from './primitives/alert';
export { Calendar, CalendarDayButton } from './primitives/calendar';
export { Checkbox } from './primitives/checkbox';
export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from './primitives/combobox';
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from './primitives/field';
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from './primitives/input-group';
export { Label } from './primitives/label';
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from './primitives/popover';
export { RadioGroup, RadioGroupItem } from './primitives/radio-group';
export { Textarea } from './primitives/textarea';

// Composed components
export { Toaster } from './components/toaster';

// Dialog hook
export { useDialog } from './hooks/use-dialog';
export type { DialogState } from './hooks/use-dialog';

//Alert components
export { CustomAlert } from './components/alert/alert';

//Card components
export { HRCard } from './components/card/card';

//DropDown components
export { DropDown } from './components/dropdown/drop-down';
export { ActionDropdown } from './components/dropdown/action-drop-down';

// Form components
export { FormField } from './components/form/form-field';
export { ColorOptionRadioGroup } from './components/form/radio/color-selector';
export { OptionRadioGroup } from './components/form/radio/radio-group';
export { RadioTab } from './components/form/radio/radio-tab';

export { HRCombobox } from './components/form/combo-box';
export { HRDateField } from './components/form/date-field';
export { DatePicker } from './components/form/date-picker';
export { Form } from './components/form/form-wrapper';
export { HRInput } from './components/form/input';
export { HRLabel } from './components/form/label';
export { HRSelect } from './components/form/select';
export { HRTextarea } from './components/form/textarea';
export { HRTimeField } from './components/form/time-field';
export { HRTabs } from './components/tabs/tabs';
export { TabsFlex } from './components/tabs/tabs-flex';
export { OptionCheckboxGroup } from './components/form/check-box/custom-checkbox';
export { LimitedOptionCheckboxGroup } from './components/form/check-box/assign-template-checkbox';

export { CheckboxGroup } from './components/form/check-box/checkbox-group';

export { OptionSwitchCheckboxGroup } from './components/form/check-box/switch-checkbox';

//Search Bar
export { SearchBar } from './components/search/search';
// Page templates — use these for quick route creation
export { HRDialog } from './components/dialog/Dialog';
export { ControlledFormDialog } from './components/dialog/controlled-form-dialog';
export type { ControlledFormDialogProps } from './components/dialog/controlled-form-dialog';
export { FormDialog } from './components/dialog/form-dialog-trigger';
export type { FormDialogProps } from './components/dialog/form-dialog-trigger';
export { ConfirmDialog } from './components/dialog/confirm-dialog';
export type { ConfirmDialogProps } from './components/dialog/confirm-dialog';
export { useDialogClose } from './components/dialog/dialog-close-context';
export { useFormId } from './components/dialog/form-id-context';
export { MultiStepForm } from './components/multi-step-form';
export type {
  MultiStepFormProps,
  StepConfig,
} from './components/multi-step-form';
export { PageHeading } from './components/page-heading';
export { ListPage } from './components/list-page';
export type {
  ListPageDropdown,
  ListPageProps,
  ListPageQuery,
  ListPageView,
} from './components/list-page';
export { ContentShell } from './components/content-shell';
export type { ContentShellProps } from './components/content-shell';
export { QueryBoundary } from './components/query-boundary';

// Data table components
export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableRowActions,
  DataTableSkeleton,
  DataTableToolbar,
  DataTableViewOptions,
} from './components/data-table';
export type {
  DataTableColumnHeaderProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableRowActionsProps,
  DataTableSkeletonProps,
  DataTableToolbarProps,
  DataTableViewOptionsProps,
  RowAction,
} from './components/data-table';

// accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './primitives/accordion';
export { HRAccordionCard } from './components/accordion/accordion';
export { HRFileUpload } from './components/form/hr-form-upload';

//slider

export { Slider } from './primitives/slider';

//rich editor

export { RichEditor } from './components/rich-editor/rich-editor';
export { Alignment } from './components/rich-editor/alignment-dropdown';
export { MarkDown } from './components/rich-editor/markdown';
export { TextSize } from './components/rich-editor/text-size-dropdown';
export { UndoRedo } from './components/rich-editor/undo-redo';
export { HeadingDropdown } from './components/rich-editor/heading-dropdown';
