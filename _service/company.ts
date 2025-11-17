import type { CompanyInfo, CreateCompanyInfoData, UpdateCompanyInfoData } from '@/types/company';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Company Information Firestore Service
 */

const COLLECTIONS = {
  COMPANY_INFO: 'companyInfo',
} as const;

/**
 * Creates or replaces company information in Firestore
 * Uses the user's UID as the document ID
 */
export async function createCompanyInfo(
  userId: string,
  data: CreateCompanyInfoData
): Promise<void> {
  try {
    const companyRef = doc(firestore, COLLECTIONS.COMPANY_INFO, userId);

    const companyInfo: CompanyInfo = {
      id: userId,
      userId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(companyRef, companyInfo);
  } catch (error) {
    console.error('Error creating company info:', error);
    throw new Error('Erro ao criar informações da empresa');
  }
}

/**
 * Gets company information from Firestore by user ID
 */
export async function getCompanyInfo(userId: string): Promise<CompanyInfo | null> {
  try {
    const companyRef = doc(firestore, COLLECTIONS.COMPANY_INFO, userId);
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
      return companySnap.data() as CompanyInfo;
    }

    return null;
  } catch (error) {
    console.error('Error getting company info:', error);
    throw new Error('Erro ao buscar informações da empresa');
  }
}

/**
 * Updates company information in Firestore
 */
export async function updateCompanyInfo(
  userId: string,
  data: UpdateCompanyInfoData
): Promise<void> {
  try {
    const companyRef = doc(firestore, COLLECTIONS.COMPANY_INFO, userId);

    await updateDoc(companyRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating company info:', error);
    throw new Error('Erro ao atualizar informações da empresa');
  }
}
