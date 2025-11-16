import type { BudgetTemplate } from '@/types/template';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Template Service
 * Handles all budget template operations
 */

const COLLECTIONS = {
  TEMPLATES: 'templates',
} as const;

/**
 * Gets all active templates
 */
export async function getActiveTemplates(): Promise<BudgetTemplate[]> {
  try {
    const templatesRef = collection(firestore, COLLECTIONS.TEMPLATES);
    const q = query(templatesRef, where('isActive', '==', true));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as BudgetTemplate);
  } catch (error) {
    console.error('Error getting templates:', error);
    throw new Error('Erro ao buscar templates');
  }
}

/**
 * Gets a single template by ID
 */
export async function getTemplateById(templateId: string): Promise<BudgetTemplate | null> {
  try {
    const templateRef = doc(firestore, COLLECTIONS.TEMPLATES, templateId);
    const templateSnap = await getDoc(templateRef);
    
    if (templateSnap.exists()) {
      return templateSnap.data() as BudgetTemplate;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting template:', error);
    throw new Error('Erro ao buscar template');
  }
}
