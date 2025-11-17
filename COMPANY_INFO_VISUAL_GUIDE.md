# Company Information Page - Visual Guide

## Screen Layout

```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║   Informações da Empresa          ║  │
│  ║   Preencha os dados para          ║  │
│  ║   continuar                       ║  │
│  ╚═══════════════════════════════════╝  │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Logo *                             │ │
│  │ ╔════════════════════════════════╗ │ │
│  │ ║                                ║ │ │
│  │ ║    Selecionar Logo             ║ │ │
│  │ ║    [  Image Preview  ]         ║ │ │
│  │ ║                                ║ │ │
│  │ ╚════════════════════════════════╝ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Nome *                             │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ Nome da empresa ou profissional│ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ CPF/CNPJ *                         │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ 000.000.000-00                 │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Email *                            │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ seu@email.com                  │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Telefone *                         │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ (00) 00000-0000                │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ╔═══════════════════════════════════╗  │
│  ║           Endereço                ║  │
│  ╚═══════════════════════════════════╝  │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ CEP *                              │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ 00000-000                      │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌──────────────────┬────────────────┐  │
│  │ Rua *            │ Nº *           │  │
│  │ ┌──────────────┐ │ ┌────────────┐ │  │
│  │ │ Nome da rua  │ │ │ 123        │ │  │
│  │ └──────────────┘ │ └────────────┘ │  │
│  └──────────────────┴────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Complemento                        │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ Apto, bloco (opcional)         │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Bairro *                           │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ Nome do bairro                 │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌──────────────────┬────────────────┐  │
│  │ Cidade *         │ UF *           │  │
│  │ ┌──────────────┐ │ ┌────────────┐ │  │
│  │ │ Nome cidade  │ │ │ SP         │ │  │
│  │ └──────────────┘ │ └────────────┘ │  │
│  └──────────────────┴────────────────┘  │
│                                          │
│  ╔═══════════════════════════════════╗  │
│  ║         Redes Sociais             ║  │
│  ╚═══════════════════════════════════╝  │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Instagram                          │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ @seuperfil                     │ │ │
│  │ └────────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │          ┌──────────┐              │ │
│  │          │ Próximo  │              │ │
│  │          └──────────┘              │ │
│  │                                    │ │
│  │          ┌──────────┐              │ │
│  │          │  Voltar  │              │ │
│  │          └──────────┘              │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Field Behaviors

### Phone Number Auto-Formatting
```
User Types:  "11" → "(11) "
User Types:  "1199" → "(11) 99"
User Types:  "11999999999" → "(11) 99999-9999"
```

### CPF/CNPJ Auto-Formatting
```
CPF (11 digits):
User Types:  "123" → "123"
User Types:  "12345678901" → "123.456.789-01"

CNPJ (14 digits):
User Types:  "12" → "12"
User Types:  "12345678000195" → "12.345.678/0001-95"
```

### ZIP Code Auto-Formatting
```
User Types:  "12345" → "12345"
User Types:  "12345678" → "12345-678"
```

### Instagram Auto-Formatting
```
User Types:  "username" → "@username"
User Types:  "@username" → "@username"
User Types:  "@@username" → "@username"
```

## Error States

When validation fails, errors appear below the field:

```
┌────────────────────────────────────┐
│ Telefone *                         │
│ ┌────────────────────────────────┐ │
│ │ (11) 1234                      │ │ ← Field with error (red border)
│ └────────────────────────────────┘ │
│ ❌ Telefone inválido. Use (XX)     │ ← Error message
│    XXXX-XXXX ou (XX) XXXXX-XXXX    │
└────────────────────────────────────┘
```

## Loading States

### Initial Loading
```
┌─────────────────────────────────────────┐
│                                          │
│              ◯ Carregando...            │
│                                          │
└─────────────────────────────────────────┘
```

### Button Loading
```
┌────────────────────────────────────┐
│          ┌──────────┐              │
│          │    ◯     │              │ ← Spinner replaces text
│          └──────────┘              │
└────────────────────────────────────┘
```

## Color Scheme

### Light Mode
- Background: White
- Text: Dark Gray/Black
- Borders: Light Gray
- Primary Button: Tint Color (Blue)
- Error: Red (#ff4444)

### Dark Mode
- Background: Dark Gray/Black
- Text: White
- Borders: Gray
- Primary Button: Tint Color (Blue)
- Error: Red (#ff4444)

## Responsive Behavior

### Small Screens (< 400px)
- Single column layout
- Full width inputs
- Stacked address fields (street/number)

### Medium/Large Screens
- Same layout (optimized for mobile)
- Better spacing
- Comfortable touch targets (48px min)

## Accessibility Features

✅ Touch targets: 48px minimum height
✅ Clear labels above all inputs
✅ Error messages with high contrast
✅ Loading indicators
✅ Disabled state visual feedback
✅ Auto-capitalization where appropriate
✅ Appropriate keyboard types:
   - Email: email keyboard
   - Phone: numeric keypad
   - Document: numeric keypad
   - Default: standard keyboard

## User Flow

```
┌─────────────┐
│   Home      │
│   Screen    │
└──────┬──────┘
       │ Click "Ir para Informações da Empresa"
       ▼
┌─────────────┐
│  Company    │
│   Info      │ ← User fills form
│   Screen    │
└──────┬──────┘
       │ Click "Próximo" (validates & saves)
       ▼
┌─────────────┐
│   Budget    │
│  Creation   │ ← Next screen (to be implemented)
│   Screen    │
└─────────────┘
```

## Dynamic Fields Example

### Minimal Required Fields
URL: `?required=name,email,phone`

Shows:
- ✅ Nome
- ✅ Email
- ✅ Telefone
- ❌ Logo (hidden)
- ❌ CPF/CNPJ (hidden)
- ❌ Endereço section (hidden)
- ❌ Redes Sociais section (hidden)

### All Fields
URL: `?required=name,email,phone,document,address,socialMedia,logo`

Shows:
- ✅ Logo
- ✅ Nome
- ✅ CPF/CNPJ
- ✅ Email
- ✅ Telefone
- ✅ Endereço section (all address fields)
- ✅ Redes Sociais section (Instagram)
