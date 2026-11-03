/**
 * Shared UI barrel for all role-based modules.
 * Re-exports the design-system primitives owned by the Super Administrator
 * module so there is a single source of truth for the visual language.
 */

export {
  Button,
  type ButtonProps,
} from '../../super-admin/components/ui/button';
export {
  Input,
  type InputProps,
} from '../../super-admin/components/ui/input';
export {
  Select,
  Option,
  type SelectProps,
} from '../../super-admin/components/ui/select';
export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  type CardProps,
} from '../../super-admin/components/ui/card';
export {
  Badge,
  type BadgeProps,
} from '../../super-admin/components/ui/badge';
export {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  type TableProps,
} from '../../super-admin/components/ui/table';
export {
  Pagination,
  type PaginationProps,
} from '../../super-admin/components/ui/pagination';
export {
  EmptyState,
  type EmptyStateProps,
} from '../../super-admin/components/ui/empty-state';
export {
  Skeleton,
  SkeletonText,
  type SkeletonProps,
} from '../../super-admin/components/ui/skeleton';
export {
  Separator,
  type SeparatorProps,
} from '../../super-admin/components/ui/separator';
export {
  Dialog,
  ConfirmDialog,
  type DialogProps,
  type ConfirmDialogProps,
} from '../../super-admin/components/ui/dialog';
export {
  Drawer,
  type DrawerProps,
} from '../../super-admin/components/ui/drawer';
export {
  Label,
  Checkbox,
  Switch,
  type CheckboxProps,
  type SwitchProps,
} from '../../super-admin/components/ui/forms';
export { ToastProvider, useToast, type Toast, type ToastVariant } from '../../super-admin/components/ui/use-toast';
export { Toaster } from '../../super-admin/components/ui/toaster';
export { cn } from '../../super-admin/components/utils';
