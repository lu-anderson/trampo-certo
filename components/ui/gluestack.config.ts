import { createConfig } from "@gluestack-style/react";

/**
 * DESIGN SYSTEM PREMIUM – NOTION / LINEAR STYLE
 * ------------------------------------------------
 * Tipografia minimalista
 * Paleta elegante e profissional
 * Radius sofisticado
 * Spacing consistente
 * Foco suave e moderno
 */

export const config = createConfig({
  tokens: {
    colors: {
      /* BASE */
      background: "#0F0F0F",     // preto fosco
      surface: "#1A1A1A",        // cinza escuro premium
      surface2: "#141414",
      white: "#FFFFFF",
      black: "#000000",

      /* TEXTO */
      textPrimary: "#FFFFFF",
      textSecondary: "#A8A8A8",
      textMuted: "#6E6E6E",

      /* UI */
      border: "#2A2A2A",
      borderLight: "#3A3A3A",

      /* COR PRINCIPAL */
      primary: "#FFFFFF",        // botão branco premium
      primaryText: "#000000",

      /* ESTADOS */
      focus: "#5B5BFF",
      success: "#4CAF50",
      danger: "#E53935",
      warning: "#FFB300",
    },

    /* RADIUS linear/notion */
    radius: {
      sm: 6,
      md: 10,
      lg: 16,
      pill: 50,
      full: 999,
    },

    /* SPACING notion */
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },

    /* FONTS */
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 28,
      xxl: 36,
    },

    fontWeights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  components: {
    /* --------------------------
     * BUTTON PREMIUM
     * ------------------------*/
    Button: {
      baseStyle: {
        height: 50,
        borderRadius: "$md",
        justifyContent: "center",
        alignItems: "center",
        px: "$md",
      },

      variants: {
        primary: {
          bg: "$primary",
          _text: {
            color: "$primaryText",
            fontWeight: "$semibold",
            fontSize: "$md",
          },
        },

        outline: {
          bg: "transparent",
          borderWidth: 1,
          borderColor: "$borderLight",
          _text: {
            color: "$white",
            fontWeight: "$medium",
            fontSize: "$md",
          },
        },

        subtle: {
          bg: "$surface",
          _text: {
            color: "$white",
            fontWeight: "$regular",
          },
        },
      },
    },

    /* --------------------------
     * INPUT PREMIUM
     * ------------------------*/
    Input: {
      baseStyle: {
        height: 50,
        bg: "$surface2",
        borderRadius: "$md",
        borderWidth: 1,
        borderColor: "$borderLight",
        px: "$md",
        color: "$white",
        fontSize: "$md",
      },

      focus: {
        borderColor: "$focus",
        shadowColor: "rgba(91,91,255,0.3)",
      },
    },

    /* --------------------------
     * TEXT PREMIUM
     * ------------------------*/
    Text: {
      variants: {
        title: {
          fontSize: "$xl",
          color: "$textPrimary",
          fontWeight: "$semibold",
        },
        subtitle: {
          fontSize: "$md",
          color: "$textSecondary",
        },
        body: {
          fontSize: "$md",
          color: "$textPrimary",
        },
        label: {
          fontSize: "$sm",
          fontWeight: "$medium",
          color: "$textPrimary",
        },
      },
    },

    /* --------------------------
     * CARD PREMIUM
     * ------------------------*/
    Card: {
      baseStyle: {
        bg: "$surface",
        p: "$lg",
        borderRadius: "$lg",
        borderWidth: 1,
        borderColor: "$border",
      },
    },
  },

  globalStyle: {
    bg: "$background",
  },
});

export default config;
