# Company Information Page - Testing Guide

## Overview
This feature implements a dynamic company information page that allows users to input and edit their professional/company details. The page is designed to be flexible, showing only the fields required by a specific budget.

## How to Access

### From Home Screen (Test Mode)
1. Login to the app
2. Navigate to the Home tab
3. Click "Ir para Informações da Empresa" button
4. This will load the page with ALL fields enabled

### Dynamic Field Loading
The page accepts URL parameters to control which fields are required:

```typescript
// Example URLs:
router.push('/company-info?required=name,email,phone')
router.push('/company-info?required=name,email,phone,document,address')
router.push('/company-info?required=name,email,phone,document,address,socialMedia,logo')
```

**Available fields:**
- `name` - Company/Professional name
- `email` - Email address
- `phone` - Phone number (Brazilian format)
- `document` - CPF/CNPJ
- `address` - Complete address (street, number, complement, neighborhood, city, state, zipCode)
- `socialMedia` - Social media handles (Instagram)
- `logo` - Company logo (image upload)

## Field Validations

### Phone
- Format: `(XX) XXXX-XXXX` or `(XX) XXXXX-XXXX`
- Automatically formatted as user types
- Must have 10 or 11 digits (including area code)

### CPF/CNPJ
- CPF format: `XXX.XXX.XXX-XX` (11 digits)
- CNPJ format: `XX.XXX.XXX/XXXX-XX` (14 digits)
- Automatically detects and formats based on length
- Full validation with check digits
- Prevents invalid documents (all same digit, etc.)

### Email
- Standard email format validation
- Required @ and domain

### ZIP Code (CEP)
- Format: `XXXXX-XXX`
- Automatically formatted as user types

### Instagram
- Optional @ prefix (automatically added)
- Alphanumeric characters, periods, and underscores only
- Maximum 30 characters

### Address
All address fields are required when `address` is in the required fields:
- Street
- Number
- Neighborhood
- City
- State (UF) - 2 characters
- ZIP Code
- Complement (optional)

## Features

### Pre-filled Data
- If the user has previously filled the form, all fields will be pre-populated
- Data is loaded from Firestore on page load
- Users can edit and update their information

### Logo Upload
- Click "Selecionar Logo" to open image picker
- Select from photo library
- Image is displayed as preview
- Supports JPEG/PNG formats
- Image is converted to base64 for storage

### Validation
- Real-time validation as user types
- Clear error messages in Portuguese
- Fields are validated on form submission
- Only required fields are validated

### Navigation
- **Voltar** button: Goes back to previous screen
- **Próximo** button: Validates and saves data, then navigates to budget creation

### Loading States
- Initial loading spinner while fetching data
- Button loading indicator during save operation
- Prevents double submission

## Data Storage

### Firestore Structure
```typescript
Collection: companyInfo
Document ID: {userId}
{
  id: string,              // Same as userId
  userId: string,          // Firebase Auth UID
  logo?: string,           // Base64 image data
  name: string,
  document?: string,       // CPF/CNPJ
  email: string,
  phone: string,
  address?: {
    street: string,
    number: string,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  },
  socialMedia?: {
    instagram?: string
  },
  createdAt: string,       // ISO timestamp
  updatedAt: string        // ISO timestamp
}
```

## Testing Scenarios

### Test 1: First Time User
1. Navigate to company-info page
2. All fields should be empty
3. Fill in required fields
4. Click "Próximo"
5. Data should be saved to Firestore
6. Should navigate to next screen

### Test 2: Returning User
1. Navigate to company-info page
2. Fields should be pre-filled with previous data
3. Edit any field
4. Click "Próximo"
5. Changes should be saved
6. Should navigate to next screen

### Test 3: Validation Errors
1. Try to submit empty required fields
2. Should show error messages
3. Enter invalid phone: "123456"
4. Should show "Telefone inválido" error
5. Enter invalid email: "notanemail"
6. Should show "Email inválido" error
7. Enter invalid CPF: "111.111.111-11"
8. Should show "CPF/CNPJ inválido" error

### Test 4: Logo Upload
1. Click "Selecionar Logo"
2. Grant permissions if prompted
3. Select an image from gallery
4. Image should appear as preview
5. Submit form
6. Image should be saved

### Test 5: Dynamic Fields
1. Navigate with `?required=name,email,phone`
2. Only name, email, and phone fields should be visible
3. Document, address, and social media sections should be hidden
4. Only visible fields should be validated

### Test 6: Phone Formatting
1. Start typing phone number
2. After 2 digits: should format to `(XX) `
3. After 6 digits: should format to `(XX) XXXX`
4. After 10 digits: should format to `(XX) XXXX-XXXX`
5. After 11 digits: should format to `(XX) XXXXX-XXXX`

### Test 7: CPF/CNPJ Formatting
1. Start typing CPF (11 digits)
2. Should format as `XXX.XXX.XXX-XX`
3. Continue to CNPJ (14 digits)
4. Should format as `XX.XXX.XXX/XXXX-XX`

## Known Limitations

1. Logo is stored as base64 in Firestore (may hit size limits for very large images)
2. Camera capture not implemented (only library selection)
3. Address autocomplete from CEP not implemented
4. Multiple social media platforms not supported (only Instagram)

## Future Enhancements

1. Implement CEP lookup API for address autocomplete
2. Add camera capture for logo
3. Support more social media platforms
4. Compress images before storage
5. Add image cropping/editing
6. Validate state codes against Brazilian UF list
7. Add phone number verification
8. Add email verification
