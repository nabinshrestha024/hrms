import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'boolean'
  | 'currency'
  | 'relation'
  | 'richtext'
  | 'file'
  | 'time'
  | 'textarea';

export interface FieldDefinition {
  name: string;
  type: FieldType;
  label?: string;
  Label?: string;
  subLabel?: string;
  icon?: LucideIcon;
  placeholder?: string;
  isRequired?: boolean;
  textAreaClassName?: string;
  validation?: {
    required?: boolean | string;
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
  visible?: string | boolean;
  readonly?: string | boolean;
  computed?: string;
  widget?: string;
  options?: string[];
  relation?: {
    entity: string;
    displayField: string;
    multiple?: boolean;
  };
}

export type LayoutNode = SectionNode | ColumnsNode | FieldRef | DividerNode;

export interface SectionNode {
  type: 'section';
  title?: string;
  header?: ReactNode;
  collapsible?: boolean;
  visible?: string;
  children: LayoutNode[];
}

export interface ColumnsNode {
  type: 'columns';
  title?: string;
  columns: number;
  responsive?: { sm?: number; md?: number; lg?: number };
  children: LayoutNode[];
}

export interface FieldRef {
  type: 'field';
  name: string;
  overrides?: Partial<FieldDefinition>;
}

export interface DividerNode {
  type: 'divider';
}

export interface FormViewConfig {
  entity: string;
  fields: FieldDefinition[];
  layout: LayoutNode;
}

export interface WidgetProps {
  field: FieldDefinition;
  form: UseFormReturn<Record<string, unknown>>;
  disabled?: boolean;
}
