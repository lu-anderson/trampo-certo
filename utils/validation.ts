/**
 * Validation utilities for forms
 */

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone format: (XX) XXXX-XXXX or (XX) XXXXX-XXXX
 */
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Must have 10 or 11 digits (with DDD)
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    return false;
  }
  
  // Check format with parentheses and hyphens
  const phoneRegex10 = /^\(\d{2}\)\s?\d{4}-\d{4}$/;  // (XX) XXXX-XXXX
  const phoneRegex11 = /^\(\d{2}\)\s?\d{5}-\d{4}$/;  // (XX) XXXXX-XXXX
  
  return phoneRegex10.test(phone) || phoneRegex11.test(phone);
}

/**
 * Formats phone number as user types
 */
export function formatPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 11 digits
  const limitedDigits = digits.slice(0, 11);
  
  // Format based on length
  if (limitedDigits.length <= 2) {
    return limitedDigits;
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
  } else if (limitedDigits.length <= 10) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 6)}-${limitedDigits.slice(6)}`;
  } else {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
  }
}

/**
 * Validates CPF (Cadastro de Pessoas Físicas)
 */
export function validateCPF(cpf: string): boolean {
  // Remove all non-digit characters
  const digits = cpf.replace(/\D/g, '');
  
  // Must have exactly 11 digits
  if (digits.length !== 11) {
    return false;
  }
  
  // Check for known invalid CPFs (all same digit)
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }
  
  // Validate check digits
  let sum = 0;
  let remainder;
  
  // First check digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.substring(9, 10))) return false;
  
  // Second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.substring(10, 11))) return false;
  
  return true;
}

/**
 * Validates CNPJ (Cadastro Nacional da Pessoa Jurídica)
 */
export function validateCNPJ(cnpj: string): boolean {
  // Remove all non-digit characters
  const digits = cnpj.replace(/\D/g, '');
  
  // Must have exactly 14 digits
  if (digits.length !== 14) {
    return false;
  }
  
  // Check for known invalid CNPJs (all same digit)
  if (/^(\d)\1{13}$/.test(digits)) {
    return false;
  }
  
  // Validate check digits
  let length = digits.length - 2;
  let numbers = digits.substring(0, length);
  const checkDigits = digits.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  // First check digit
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(checkDigits.charAt(0))) return false;
  
  // Second check digit
  length = length + 1;
  numbers = digits.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(checkDigits.charAt(1))) return false;
  
  return true;
}

/**
 * Validates CPF or CNPJ based on length
 */
export function validateDocument(document: string): boolean {
  const digits = document.replace(/\D/g, '');
  
  if (digits.length === 11) {
    return validateCPF(document);
  } else if (digits.length === 14) {
    return validateCNPJ(document);
  }
  
  return false;
}

/**
 * Formats CPF/CNPJ as user types
 */
export function formatDocument(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // CPF format: XXX.XXX.XXX-XX
  if (digits.length <= 11) {
    const limitedDigits = digits.slice(0, 11);
    if (limitedDigits.length <= 3) {
      return limitedDigits;
    } else if (limitedDigits.length <= 6) {
      return `${limitedDigits.slice(0, 3)}.${limitedDigits.slice(3)}`;
    } else if (limitedDigits.length <= 9) {
      return `${limitedDigits.slice(0, 3)}.${limitedDigits.slice(3, 6)}.${limitedDigits.slice(6)}`;
    } else {
      return `${limitedDigits.slice(0, 3)}.${limitedDigits.slice(3, 6)}.${limitedDigits.slice(6, 9)}-${limitedDigits.slice(9)}`;
    }
  }
  
  // CNPJ format: XX.XXX.XXX/XXXX-XX
  const limitedDigits = digits.slice(0, 14);
  if (limitedDigits.length <= 2) {
    return limitedDigits;
  } else if (limitedDigits.length <= 5) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`;
  } else if (limitedDigits.length <= 8) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 5)}.${limitedDigits.slice(5)}`;
  } else if (limitedDigits.length <= 12) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 5)}.${limitedDigits.slice(5, 8)}/${limitedDigits.slice(8)}`;
  } else {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 5)}.${limitedDigits.slice(5, 8)}/${limitedDigits.slice(8, 12)}-${limitedDigits.slice(12)}`;
  }
}

/**
 * Validates Instagram handle (optional @ prefix, alphanumeric and underscores)
 */
export function validateInstagram(handle: string): boolean {
  if (!handle) return true; // Optional field
  
  // Remove @ if present
  const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
  
  // Instagram username rules: 1-30 characters, letters, numbers, periods, underscores
  const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
  return instagramRegex.test(cleanHandle);
}

/**
 * Formats Instagram handle (ensures @ prefix)
 */
export function formatInstagram(value: string): string {
  if (!value) return '';
  
  // Remove @ if present, then add it back
  const cleanHandle = value.replace(/^@+/, '');
  
  // Only allow valid Instagram characters
  const validChars = cleanHandle.replace(/[^a-zA-Z0-9._]/g, '');
  
  // Limit to 30 characters (Instagram limit)
  const limitedHandle = validChars.slice(0, 30);
  
  return limitedHandle ? `@${limitedHandle}` : '';
}

/**
 * Validates ZIP code format (Brazilian CEP)
 */
export function validateZipCode(zipCode: string): boolean {
  // Format: XXXXX-XXX
  const zipRegex = /^\d{5}-\d{3}$/;
  return zipRegex.test(zipCode);
}

/**
 * Formats ZIP code as user types
 */
export function formatZipCode(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 8 digits
  const limitedDigits = digits.slice(0, 8);
  
  // Format: XXXXX-XXX
  if (limitedDigits.length <= 5) {
    return limitedDigits;
  } else {
    return `${limitedDigits.slice(0, 5)}-${limitedDigits.slice(5)}`;
  }
}
