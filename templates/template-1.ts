export const renderTemplate1 = (data: any) => {
  const { 
    title,
    service,
    date = new Date().toLocaleDateString('pt-BR'),
    type = 'Serviço',
    clientName,
    items = [],
    deadlineDescription,
    paymentDescription,
    startJobDescription,
    budgetValidityDescription,
    phone,
    email,
    socialMedia,
  } = data;
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orçamento Pintura Residencial</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      /* Reset básico e configurações globais */
      body {
        margin: 0;
        padding: 40px 20px;
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6;
        -webkit-font-smoothing: antialiased;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
      }
      * {
        box-sizing: border-box;
      }
      
      /* Estilos específicos para impressão */
      @media print {
        body { 
          background-color: white; 
          padding: 0; 
          display: block;
        }
        .container { 
          width: 100% !important; 
          max-width: none !important; 
          box-shadow: none !important; 
          margin: 0 !important; 
        }
        .no-print { 
          display: none !important; 
        }
      }
    </style>
  </head>
  <body>
    <!-- Container Principal do Orçamento -->
    <div class="container" style="
      width: 100%;
      max-width: 750px;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      color: #1f2937;
    ">
      
      <!-- Header Azul -->
      <div style="
        background-color: #1e5aa0;
        color: white;
        padding: 1.5rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      ">
        <div>
          <h1 style="
            font-size: 2.25rem;
            font-weight: 700;
            letter-spacing: -0.025em;
            margin: 0;
            line-height: 1;
          ">${title}</h1>
          <h2 style="
            font-size: 1.25rem;
            font-weight: 300;
            opacity: 0.9;
            margin-top: 0.25rem;
            margin-bottom: 0;
          ">${service}</h2>
        </div>
        <div style="
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.8;
          margin-top: 0.5rem;
        ">
          ${date}
        </div>
      </div>

      <!-- Conteúdo Interno -->
      <div style="padding: 2rem;">
        
        <!-- Introdução -->
        <div style="margin-bottom: 2rem;">
          <p style="font-size: 1.125rem; margin: 0; line-height: 1.5;">
            Proposta para ${service}<br />
            para a <span style="font-weight: 700;">Cliente ${clientName}</span>
          </p>
        </div>

        <!-- Tabela de Serviços -->
        <div style="margin-bottom: 2rem;">
          
          <!-- Cabeçalho da Tabela -->
          <div style="
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 4px;
            margin-bottom: 4px;
          ">
            <div style="
              background-color: #1e5aa0;
              color: white;
              font-weight: 700;
              padding: 0.75rem 1rem;
              font-size: 1.125rem;
            ">
              ${type}
            </div>
            <div style="
              background-color: #1e5aa0;
              color: white;
              font-weight: 700;
              padding: 0.75rem 1rem;
              text-align: center;
              font-size: 1.125rem;
            ">
              VALOR
            </div>
          </div>

          <!-- Linhas da Tabela -->
          <div style="display: flex; flex-direction: column; gap: 4px;">
            
            ${items.map((item: any) => `
            <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 4px;">
              <div style="background-color: #e5e7eb; color: #1f2937; padding: 1rem; font-weight: 500; display: flex; align-items: center;">
                ${item.description}
              </div>
              <div style="background-color: #93c5fd; color: #111827; font-weight: 700; padding: 1rem; display: flex; align-items: center; justify-content: center;">
                R$&nbsp;${item.unitPrice}
              </div>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- Condições -->
        <div style="margin-bottom: 2.5rem; font-size: 0.875rem;">
          <div style="display: flex; align-items: flex-start; margin-bottom: 0.25rem;">
            <span style="margin-right: 0.5rem;">•</span>
            <span>${deadlineDescription}</span>
          </div>
          <div style="display: flex; align-items: flex-start; margin-bottom: 0.25rem;">
            <span style="margin-right: 0.5rem;">•</span>
            <span>${paymentDescription}</span>
          </div>
          <div style="display: flex; align-items: flex-start; margin-bottom: 0.25rem;">
            <span style="margin-right: 0.5rem;">•</span>
            <span>${startJobDescription}</span>
          </div>
          <div style="display: flex; align-items: flex-start; margin-bottom: 0.25rem;">
            <span style="margin-right: 0.5rem;">•</span>
            <span>${budgetValidityDescription}</span>
          </div>
        </div>

        <!-- Rodapé -->
        <div style="
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 1rem;
        ">
          
          <!-- Contato -->
          <div style="
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
            min-width: 220px;
          ">
            <!-- Telefone -->
            <div style="display: flex; align-items: center; font-weight: 500;">
              <div style="
                background-color: #1e5aa0;
                border-radius: 50%;
                padding: 4px;
                margin-right: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              ${phone}
            </div>
            
            <!-- Email -->
            <div style="display: flex; align-items: center; font-weight: 500;">
              <div style="
                background-color: #1e5aa0;
                border-radius: 50%;
                padding: 4px;
                margin-right: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              ${email}
            </div>

            <!-- Instagram -->
            <div style="display: flex; align-items: center; font-weight: 500;">
               <div style="
                background-color: #1e5aa0;
                border-radius: 50%;
                padding: 4px;
                margin-right: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
               ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              ${socialMedia}
            </div>
          </div>

          <!-- Logo e Empresa -->
          <div style="display: flex; align-items: center;">
            <div style="position: relative; margin-right: 0.75rem;">
               <!-- Home Icon -->
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1e5aa0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
               <div style="
                 position: absolute;
                 bottom: 4px;
                 right: 4px;
                 background-color: white;
                 border-radius: 50%;
                 padding: 2px;
                 display: flex;
               ">
                  <!-- Paint Bucket Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#374151" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>
               </div>
            </div>
            <div>
              <h3 style="
                color: #1e5aa0;
                font-size: 1.875rem;
                font-weight: 800;
                line-height: 1;
                margin: 0;
              ">
                Hélio Russo
              </h3>
              <p style="
                color: #4b5563;
                font-size: 0.875rem;
                font-weight: 500;
                margin: 0;
              ">
                Pintor Residencial
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <div class="no-print" style="margin-top: 2rem; text-align: center; color: #6b7280; font-size: 0.875rem;">
      <p>HTML Puro & Inline CSS</p>
    </div>

  </body>
</html>`
}