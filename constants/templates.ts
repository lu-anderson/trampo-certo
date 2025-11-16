import type { BudgetTemplate } from '@/types/template';

/**
 * Mock Templates Data
 * In a real app, these would be fetched from Firestore
 * For now, we use hardcoded data with placeholder images
 */

export const MOCK_TEMPLATES: BudgetTemplate[] = [
  {
    id: 'template-1-modern',
    name: 'Moderno',
    description: 'Design moderno e minimalista, ideal para serviços de tecnologia e design',
    category: 'modern',
    isActive: true,
    layout: {
      colors: {
        primary: '#0a7ea4',
        secondary: '#687076',
        accent: '#11181C',
      },
      fonts: {
        heading: 'sans',
        body: 'sans',
      },
      sections: ['header', 'items', 'summary', 'terms', 'footer'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'template-2-classic',
    name: 'Clássico',
    description: 'Estilo tradicional e elegante, perfeito para serviços profissionais',
    category: 'classic',
    isActive: true,
    layout: {
      colors: {
        primary: '#2c3e50',
        secondary: '#7f8c8d',
        accent: '#34495e',
      },
      fonts: {
        heading: 'serif',
        body: 'serif',
      },
      sections: ['header', 'items', 'summary', 'terms', 'footer'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'template-3-minimal',
    name: 'Minimalista',
    description: 'Clean e direto ao ponto, ótimo para freelancers',
    category: 'minimal',
    isActive: true,
    layout: {
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#333333',
      },
      fonts: {
        heading: 'sans',
        body: 'sans',
      },
      sections: ['header', 'items', 'summary', 'footer'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'template-4-professional',
    name: 'Profissional',
    description: 'Layout corporativo e confiável para grandes projetos',
    category: 'professional',
    isActive: true,
    layout: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#64748b',
        accent: '#0f172a',
      },
      fonts: {
        heading: 'sans',
        body: 'sans',
      },
      sections: ['header', 'items', 'summary', 'terms', 'footer'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'template-5-colorful',
    name: 'Criativo',
    description: 'Vibrante e colorido, ideal para áreas criativas',
    category: 'colorful',
    isActive: true,
    layout: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
      },
      fonts: {
        heading: 'rounded',
        body: 'sans',
      },
      sections: ['header', 'items', 'summary', 'terms', 'footer'],
    },
    createdAt: new Date().toISOString(),
  },
];

/**
 * Get all active templates (mock implementation)
 * In production, this would call the service layer
 */
export function getMockTemplates(): BudgetTemplate[] {
  return MOCK_TEMPLATES.filter(template => template.isActive);
}

/**
 * Get template by ID (mock implementation)
 */
export function getMockTemplateById(id: string): BudgetTemplate | undefined {
  return MOCK_TEMPLATES.find(template => template.id === id);
}
