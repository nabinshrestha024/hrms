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

// Composed components
export { Toaster } from './components/toaster';

// Dialog hook
export { useDialog } from './hooks/use-dialog';
export type { DialogState } from './hooks/use-dialog';

// Form components
export { FormField } from './components/form-field';

// Page templates — use these for quick route creation
export { FormDialog } from './components/form-dialog';
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
