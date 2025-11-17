/**
 * Company/Professional Information type definitions
 */

export interface CompanyAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CompanySocialMedia {
  instagram?: string;
}

export interface CompanyInfo {
  id: string;              // Document ID (user's UID)
  userId: string;          // Reference to user
  logo?: string;           // URL to logo image or base64
  name: string;            // Company/Professional name
  document?: string;       // CPF/CNPJ
  email: string;
  phone: string;
  address?: CompanyAddress;
  socialMedia?: CompanySocialMedia;
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}

export interface CreateCompanyInfoData {
  logo?: string;
  name: string;
  document?: string;
  email: string;
  phone: string;
  address?: CompanyAddress;
  socialMedia?: CompanySocialMedia;
}

export interface UpdateCompanyInfoData {
  logo?: string;
  name?: string;
  document?: string;
  email?: string;
  phone?: string;
  address?: CompanyAddress;
  socialMedia?: CompanySocialMedia;
}

// Fields that can be required dynamically
export type CompanyInfoField = 
  | 'logo'
  | 'name'
  | 'document'
  | 'email'
  | 'phone'
  | 'address'
  | 'socialMedia';
