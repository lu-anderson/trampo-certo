/**
 * Budget Template type definitions
 */

import type { ImageSourcePropType } from 'react-native';

export interface BudgetTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: ImageSourcePropType; // Optional - local image or URL
  category: 'modern' | 'classic' | 'minimal' | 'professional' | 'colorful';
  isActive: boolean;
  layout: TemplateLayout;
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
  sections: string[]; // Ordered list of sections to display
}
