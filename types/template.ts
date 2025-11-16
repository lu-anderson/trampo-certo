/**
 * Budget Template type definitions
 */

export interface BudgetTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string; // Optional - URL to preview image
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
