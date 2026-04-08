// Shell layout components
export { MobileNav } from './components/mobile-nav';
export { IconBar } from './components/sidebar/icon-bar';
export { ShellLayout } from './components/sidebar/shell-layout';
export type { NavLinkProps } from './components/sidebar/shell-layout';
export { SubNav } from './components/sidebar/sub-nav';
export { TopBar } from './components/sidebar/top-bar';
export { findActiveModule, navModules } from './lib/nav-config';
export type { NavModule, NavSubItem } from './lib/nav-config';

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
export { CustomAlert } from './components/alert/Alert';

//Card components
export { HRCard } from './components/card/Card';

//DropDown components
export { DropDown } from './components/dropdown/DropDown';
export { ActionDropdown } from './components/dropdown/ActionDropDown';

// Form components
export { FormField } from './components/form/FormField';
export { ColorOptionRadioGroup } from './components/form/Radio/ColorSelector';
export { OptionRadioGroup } from './components/form/Radio/RadioGroup';
export { HRCombobox } from './components/form/ComboBox';
export { HRDateField } from './components/form/DateField';
export { DatePicker } from './components/form/DatePicker';
export { Form } from './components/form/FormWrapper';
export { HRInput } from './components/form/Input';
export { HRLabel } from './components/form/Label';
export { HRSelect } from './components/form/Select';
export { HRTextarea } from './components/form/Textarea';
export { HRTimeField } from './components/form/TimeField';
export { HRTabs } from './components/tabs/Tabs';
export { TabsFlex } from './components/tabs/TabsFlex';

//Search Bar
export { SearchBar } from './components/search/Search';
// Page templates — use these for quick route creation
export { FormDialog } from './components/dialog/form-dialog';
export { useDialogFormStore } from './components/dialog/form-store';
export { MultiStepForm } from './components/multi-step-form';
export type {
  MultiStepFormProps,
  StepConfig,
} from './components/multi-step-form';
export { PageHeader } from './components/page-header';
export { TablePage } from './components/table-page';
export type {
  FetchParams,
  FetchResult,
  TablePageProps,
} from './components/table-page';

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

export { HRFileUpload } from './components/form/HRFormUpload';
