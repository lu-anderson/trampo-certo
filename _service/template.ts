import type { BudgetTemplate } from '@/types/template';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Template Service
 * Handles all budget template operations
 */

const COLLECTIONS = {
  TEMPLATES: 'templates',
} as const;

/**
 * Map template thumbnail filenames to actual require() calls
 * This is necessary because Firebase can't store require() results
 */
const THUMBNAIL_MAP: Record<string, any> = {
  'template-1.png': require('@/assets/images/template-1.png'),
  'template-2.png': require('@/assets/images/template-2.png'),
  'template-3.png': require('@/assets/images/template-3.png'),
  'template-4.png': require('@/assets/images/template-4.png'),
  'template-5.png': require('@/assets/images/template-5.png'),
};

/**
 * Helper to map thumbnail filename to require() result
 */
function mapThumbnail(template: BudgetTemplate): BudgetTemplate {
  if (template.thumbnailUrl && typeof template.thumbnailUrl === 'string') {
    const thumbnailAsset = THUMBNAIL_MAP[template.thumbnailUrl];
    if (thumbnailAsset) {
      return { ...template, thumbnailUrl: thumbnailAsset };
    }
  }
  return template;
}

/**
 * Gets all active templates
 */
export async function getActiveTemplates(): Promise<BudgetTemplate[]> {
  try {
    const templatesRef = collection(firestore, COLLECTIONS.TEMPLATES);
    const q = query(templatesRef, where('isActive', '==', true));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => mapThumbnail(doc.data() as BudgetTemplate));
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
      return mapThumbnail(templateSnap.data() as BudgetTemplate);
    }

    return null;
  } catch (error) {
    console.error('Error getting template:', error);
    throw new Error('Erro ao buscar template');
  }
}

/**
 * Saves a template to Firebase
 */
export async function saveTemplate(template: BudgetTemplate): Promise<void> {
  try {
    const templateRef = doc(firestore, COLLECTIONS.TEMPLATES, template.id);
    await setDoc(templateRef, template);
  } catch (error) {
    console.error('Error saving template:', error);
    throw new Error('Erro ao salvar template');
  }
}
