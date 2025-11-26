import type { TemplateRenderData } from './index';

/**
 * Template 2 - Elegant Spa & Aesthetic Center
 * Based on Borcelle budget design
 */

/**
 * Legacy function - kept for backward compatibility
 * @deprecated Use renderTemplate2 with TemplateRenderData instead
 */
export const renderTemplate2Legacy = (data: any) => {
  const {
    // Company info
    companyName = '',
    logoBase64,
    address = '',
    phone = '',
    email = '',
    instagram = '',

    // Budget details
    budgetNumber = '',
    clientName = '',
    validity = '',

    // Service info
    service = '',
    items = [],

    // Payment and observations
    paymentMethod = '',
    observations = '',
    attendant = '',
    date = new Date().toLocaleDateString('pt-BR'),
  } = data;

  // Logo HTML - uses base64 from device storage
  const logoHtml = logoBase64
    ? `<img src="data:image/png;base64,${logoBase64}" style="width: 120px; height: auto; max-height: 100px; object-fit: contain;" />`
    : '';

  const servicesHtml = items
    .map((item: any) => `<li style="margin: 8px 0; font-size: 14px; color: #4a4a4a; font-family: 'Georgia', serif;">${item.description}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orçamento - ${companyName}</title>
    <style>
      @media print {
        body { 
          background-color: white; 
          padding: 0; 
        }
        .no-print { 
          display: none !important; 
        }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #e8e8e8;">
    <div style="max-width: 485px; margin: 0 auto; background-color: #f5f5f5; min-height: 100vh; position: relative; overflow: hidden;">
        
        <!-- Decorative background elements -->
        <div style="position: absolute; right: -20px; top: 80px; opacity: 0.15; width: 150px; height: 400px;">
            <svg viewBox="0 0 150 400" style="width: 100%; height: 100%;">
                <!-- Branch decoration -->
                <path d="M 75 0 Q 60 100 50 200 T 40 400" stroke="#a8a090" stroke-width="3" fill="none"/>
                <!-- Leaves -->
                <ellipse cx="30" cy="120" rx="15" ry="25" fill="#a8a090" transform="rotate(-30 30 120)"/>
                <ellipse cx="50" cy="120" rx="15" ry="25" fill="#a8a090" transform="rotate(30 50 120)"/>
                <ellipse cx="25" cy="180" rx="15" ry="25" fill="#a8a090" transform="rotate(-30 25 180)"/>
                <ellipse cx="45" cy="180" rx="15" ry="25" fill="#a8a090" transform="rotate(30 45 180)"/>
                <ellipse cx="20" cy="240" rx="15" ry="25" fill="#a8a090" transform="rotate(-30 20 240)"/>
                <ellipse cx="40" cy="240" rx="15" ry="25" fill="#a8a090" transform="rotate(30 40 240)"/>
                <ellipse cx="30" cy="300" rx="12" ry="20" fill="#a8a090" transform="rotate(-30 30 300)"/>
                <ellipse cx="45" cy="300" rx="12" ry="20" fill="#a8a090" transform="rotate(30 45 300)"/>
                <ellipse cx="25" cy="350" rx="12" ry="20" fill="#a8a090" transform="rotate(-30 25 350)"/>
                <ellipse cx="40" cy="350" rx="12" ry="20" fill="#a8a090" transform="rotate(30 40 350)"/>
            </svg>
        </div>
        <!-- Logo -->
        ${logoHtml ? `
        <div style="text-align: center; padding-top: 40px; padding-bottom: 20px;">
            ${logoHtml}
        </div>
        ` : ''}

        <!-- Company name -->
        <div style="text-align: center; margin-bottom: 20px; ${logoHtml ? 'margin-top: -10px;' : 'padding-top: 40px;'}">
            <h2 style="font-size: 24px; color: #8B7E74; margin: 0; font-weight: normal; letter-spacing: 2px;">${companyName}</h2>
            <p style="font-size: 12px; color: #a8a090; margin: 5px 0; font-style: italic;">Centro de Estética Avançada</p>
        </div>

        <!-- Main content -->
            <div style="padding: 0 40px; position: relative; z-index: 1;" >

              <!--Title -->
                <h1 style="font-size: 28px; color: #6b6b6b; margin: 40px 0 10px 0; font-weight: normal; letter-spacing: 1px;" > Seu Orçamento </h1>

                  < !--Budget details-- >
                    <div style="margin-bottom: 30px;" >
                      ${budgetNumber ? `<p style="margin: 5px 0; font-size: 14px; color: #4a4a4a;">Orçamento Nº ${budgetNumber}</p>` : ''}
  <p style="margin: 5px 0; font-size: 14px; color: #4a4a4a;" > Cliente: ${clientName} </p>
                ${validity ? `<p style="margin: 5px 0; font-size: 14px; color: #4a4a4a;">Válido até ${validity}</p>` : ''}
  </div>

    < !--Service section-- >
      ${servicesHtml ? `
            <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #4a4a4a; font-weight: bold;">Serviço:</p>
                <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
                    ${servicesHtml}
                </ul>
            </div>
            ` : ''
    }

  <!--Observations -->
    <div style="margin-top: 60px; font-size: 11px; color: #4a4a4a; line-height: 1.6;" >
      ${paymentMethod ? `<p style="margin: 3px 0;"><strong>Obs.:</strong> Orçamento válido para pagamento por ${paymentMethod}</p>` : ''}
                ${observations ? `<p style="margin: 3px 0;">${observations}</p>` : ''}
  <p style="margin: 3px 0;" > Criado em ${date}${attendant ? ` | Atendimento ${attendant}` : ''} </p>
    </div>

    </div>

    < !--Footer -->
      <div style="position: absolute; bottom: 30px; left: 0; right: 0; text-align: center; padding: 30px 20px;" >
        ${instagram ? `<p style="margin: 5px 0; font-size: 11px; color: #4a4a4a;">${instagram}</p>` : ''}
            ${phone ? `<p style="margin: 5px 0; font-size: 11px; color: #4a4a4a;">Tel: ${phone}</p>` : ''}
            ${email ? `<p style="margin: 5px 0; font-size: 11px; color: #4a4a4a;">${email}</p>` : ''}
            ${address ? `<p style="margin: 5px 0; font-size: 11px; color: #4a4a4a;">${address}</p>` : ''}
  </div>

    < !--Footer color bar-- >
      <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 30px; background-color: #b8b89a;" > </div>

        </div>
        </body>
        </html>
          `.trim();
};

/**
 * Standardized template renderer using TemplateRenderData
 * This is the new recommended way to render template-2
 */
export const renderTemplate2 = (data: TemplateRenderData, logoBase64?: string): string => {
  // Helper to format date fields
  const formatDate = (value: any): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString('pt-BR');
    }
    return value || '';
  };

  // Helper to format array fields
  const formatArray = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
  };

  // Map standardized data to legacy format
  return renderTemplate2Legacy({
    companyName: data.companyInfo.name,
    logoBase64,
    address: data.companyInfo.address || '',
    phone: data.companyInfo.phone || '',
    email: data.companyInfo.email || '',
    instagram: data.companyInfo.socialMedia?.instagram || '',
    budgetNumber: data.budgetInfo.fieldValues['budgetNumber'] || '',
    clientName: data.budgetInfo.client.name,
    validity: formatDate(data.budgetInfo.fieldValues['validity']),
    service: data.budgetInfo.fieldValues['service'] || '',
    items: data.budgetInfo.items,
    paymentMethod: formatArray(data.budgetInfo.fieldValues['paymentMethod'] || data.budgetInfo.fieldValues['payment']),
    observations: data.budgetInfo.fieldValues['observations'] || '',
    attendant: data.budgetInfo.fieldValues['attendant'] || '',
    date: data.budgetInfo.date,
  });
};
