import AsyncStorage from '@react-native-async-storage/async-storage';
import { Paths, File } from 'expo-file-system';
import type { CompanyInfo } from '@/types/company';

/**
 * Cache Service for storing company information locally
 */

const CACHE_KEYS = {
  COMPANY_INFO: 'company_info',
  LOGO_URI: 'company_logo_uri',
} as const;

/**
 * Saves company information to local cache (AsyncStorage)
 */
export async function saveCompanyInfoToCache(companyInfo: CompanyInfo): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEYS.COMPANY_INFO, JSON.stringify(companyInfo));
  } catch (error) {
    console.error('Error saving company info to cache:', error);
    throw new Error('Erro ao salvar informações no cache');
  }
}

/**
 * Gets company information from local cache
 */
export async function getCompanyInfoFromCache(): Promise<CompanyInfo | null> {
  try {
    const data = await AsyncStorage.getItem(CACHE_KEYS.COMPANY_INFO);
    if (data) {
      return JSON.parse(data) as CompanyInfo;
    }
    return null;
  } catch (error) {
    console.error('Error getting company info from cache:', error);
    return null;
  }
}

/**
 * Saves logo image to local file system and returns the file URI
 * Handles both base64 images and file URIs
 */
export async function saveLogoToDevice(imageSource: string): Promise<string> {
  try {
    // Create a unique filename
    const filename = `company_logo_${Date.now()}.jpg`;
    const file = new File(Paths.document, filename);
    
    if (imageSource.startsWith('data:image')) {
      // Base64 image - decode and save
      const base64Data = imageSource.replace(/^data:image\/\w+;base64,/, '');
      file.write(base64Data, { encoding: 'base64' });
    } else if (imageSource.startsWith('file://')) {
      // File URI - read and copy to app directory
      const sourceFile = new File(imageSource);
      const content = await sourceFile.bytes();
      file.write(content);
    } else if (imageSource.startsWith('content://')) {
      // Android content URI - read and copy
      const sourceFile = new File(imageSource);
      const content = await sourceFile.bytes();
      file.write(content);
    } else {
      // Already saved in app directory
      return imageSource;
    }
    
    // Store the URI in AsyncStorage
    await AsyncStorage.setItem(CACHE_KEYS.LOGO_URI, file.uri);
    
    return file.uri;
  } catch (error) {
    console.error('Error saving logo to device:', error);
    throw new Error('Erro ao salvar logo no dispositivo');
  }
}

/**
 * Gets logo URI from device storage
 */
export async function getLogoFromDevice(): Promise<string | null> {
  try {
    const fileUri = await AsyncStorage.getItem(CACHE_KEYS.LOGO_URI);
    
    if (!fileUri) {
      return null;
    }
    
    // Check if file still exists
    const file = new File(fileUri);
    
    if (file.exists) {
      return fileUri;
    } else {
      // File was deleted, clean up the reference
      await AsyncStorage.removeItem(CACHE_KEYS.LOGO_URI);
      return null;
    }
  } catch (error) {
    console.error('Error getting logo from device:', error);
    return null;
  }
}

/**
 * Deletes the logo from device storage
 */
export async function deleteLogoFromDevice(): Promise<void> {
  try {
    const fileUri = await AsyncStorage.getItem(CACHE_KEYS.LOGO_URI);
    
    if (fileUri) {
      const file = new File(fileUri);
      if (file.exists) {
        file.delete();
      }
      await AsyncStorage.removeItem(CACHE_KEYS.LOGO_URI);
    }
  } catch (error) {
    console.error('Error deleting logo from device:', error);
  }
}

/**
 * Clears all cached company information
 */
export async function clearCompanyInfoCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEYS.COMPANY_INFO);
    await deleteLogoFromDevice();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}
