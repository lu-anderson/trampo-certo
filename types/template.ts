/**
 * Budget Template type definitions
 */

import type { ImageSourcePropType } from 'react-native';

export interface Client {
  id: string;
  name: string;
  phone: string;
  isWhatsapp: boolean;
  email?: string;
  address?: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type FieldType = 'text' | 'date' | 'options' | 'list' | 'money' | 'idRef';
export type IdRefType = 'client' | 'item';

export interface TemplateField {
  key: string;
  label: string;
  idRef?: IdRefType;
  type: FieldType;
  required: boolean;
  options?: string[]; // For 'options' type
  placeholder?: string;
  defaultValue?: any;
}

export interface BudgetTemplate {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[]; // Ordered list of fields to render
  companyInfoFields: string[]; // Required company info fields (e.g., ['logo', 'phone', 'email', 'socialMedia'])
  thumbnailUrl?: ImageSourcePropType;
  category: 'modern' | 'classic' | 'minimal' | 'professional' | 'colorful';
  isActive: boolean;
  layout: TemplateLayout[];
  createdAt: string;
}

export interface TemplateLayout {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}
