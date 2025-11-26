/**
 * Template Registry System
 * 
 * This file provides a centralized registry for all budget templates.
 * New templates can be added without modifying budget-details.tsx
 */

import type { CreateCompanyInfoData } from '@/types/company';
import type { BudgetItem, Client } from '@/types/template';

import { renderTemplate1 } from './template-1';
import { renderTemplate2 } from './template-2';

/**
 * Standardized data structure that all templates receive
 * This ensures consistency across all template renderers
 */
export interface TemplateRenderData {
  // Company information
  companyInfo: CreateCompanyInfoData;

  // Budget information
  budgetInfo: {
    budgetName: string;
    budgetNumber?: string;
    date: string;
    client: Client;
    fieldValues: Record<string, any>;
    items: BudgetItem[];
  };
}

/**
 * Template renderer function signature
 * All template render functions must follow this signature
 */
export type TemplateRenderer = (data: TemplateRenderData, logoBase64?: string) => string;

/**
 * Template registry - maps template IDs to their render functions
 * Add new templates here without touching budget-details.tsx
 */
const TEMPLATE_REGISTRY: Record<string, TemplateRenderer> = {
  '01': renderTemplate1,
  '02': renderTemplate2,
  // Add more templates here as needed:
  // '03': renderTemplate3,
  // '04': renderTemplate4,
};

/**
 * Main function to render any template dynamically
 * This is the ONLY function that budget-details.tsx needs to import
 * 
 * @param templateId - The ID of the template to render
 * @param data - Standardized data for rendering
 * @returns HTML string for the budget
 */
export function renderTemplate(templateId: string, data: TemplateRenderData, logoBase64: string | undefined): string {
  const renderer = TEMPLATE_REGISTRY[templateId];

  if (!renderer) {
    console.warn(`Template renderer not found for ID: ${templateId}, falling back to template 01`);
    return TEMPLATE_REGISTRY['01'](data, logoBase64);
  }

  return renderer(data, logoBase64);
}

/**
 * Check if a template renderer exists
 */
export function hasTemplateRenderer(templateId: string): boolean {
  return templateId in TEMPLATE_REGISTRY;
}

/**
 * Get all registered template IDs
 */
export function getRegisteredTemplateIds(): string[] {
  return Object.keys(TEMPLATE_REGISTRY);
}
