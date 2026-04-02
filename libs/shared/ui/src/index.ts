// Shell layout components
export { ShellLayout } from './components/shell-layout';
export type { NavLinkProps } from './components/shell-layout';
export { IconBar } from './components/icon-bar';
export { SubNav } from './components/sub-nav';
export { navModules, findActiveModule } from './lib/nav-config';
export type { NavModule, NavSubItem } from './lib/nav-config';
export { TopBar } from './components/top-bar';
export { MobileNav } from './components/mobile-nav';

// Hooks
export { useIsMobile } from './hooks/use-mobile';

// Primitives exported directly (ERP wrappers come in later phases)
export { Button, buttonVariants } from './primitives/button';
export { Input } from './primitives/input';
export { Skeleton } from './primitives/skeleton';
export { Separator } from './primitives/separator';
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './primitives/tooltip';
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './primitives/sheet';
export { Avatar, AvatarImage, AvatarFallback } from './primitives/avatar';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from './primitives/dropdown-menu';
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
export { Switch } from './primitives/switch';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
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

// Hooks – toast
export { useToast, toast, dismiss } from './hooks/use-toast';

// Hooks – data table
export { useDataTable } from './hooks/use-data-table';
export type {
  UseDataTableProps,
  UseDataTableReturn,
} from './hooks/use-data-table';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './primitives/dialog';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './primitives/card';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './primitives/tabs';
export { Badge, badgeVariants } from './primitives/badge';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './primitives/breadcrumb';

// Composed components
export { Toaster } from './components/toaster';

// Dialog hook
export { useDialog } from './hooks/use-dialog';
export type { DialogState } from './hooks/use-dialog';

// Form components
export { FormField } from './components/form-field';

// Page templates — use these for quick route creation
export { PageHeader } from './components/page-header';
export { TablePage } from './components/table-page';
export type {
  TablePageProps,
  FetchParams,
  FetchResult,
} from './components/table-page';
export { FormDialog } from './components/form-dialog';
export { MultiStepForm } from './components/multi-step-form';
export type {
  StepConfig,
  MultiStepFormProps,
} from './components/multi-step-form';

// Data table components
export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableRowActions,
  DataTableToolbar,
  DataTableViewOptions,
  DataTableSkeleton,
} from './components/data-table';
export type {
  DataTableProps,
  DataTableColumnHeaderProps,
  DataTablePaginationProps,
  DataTableRowActionsProps,
  DataTableToolbarProps,
  DataTableViewOptionsProps,
  DataTableSkeletonProps,
  RowAction,
} from './components/data-table';
