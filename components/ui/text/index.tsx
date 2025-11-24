import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "@/theme/tokens";

/*
  Typography Premium
  -------------------
  Inspirado em iOS 17, Neon, Ovoca, Notion Mobile.
  
  Mantém compatibilidade:
  - <Text /> continua funcionando normalmente
  - Prop "type" controla estilos premium
  - Props normais continuam funcionando (style, numberOfLines...)
*/

type TypographyType =
  | "title"
  | "subtitle"
  | "heading"
  | "body"
  | "caption"
  | "label";

interface TypographyProps {
  children: React.ReactNode;
  type?: TypographyType;
  style?: any;
  numberOfLines?: number;
}

export function ThemedText({
  children,
  type = "body",
  style,
  numberOfLines,
  ...rest
}: TypographyProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[baseStyles.text, typeStyles[type], style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const baseStyles = StyleSheet.create({
  text: {
    color: colors.text.primary,
    includeFontPadding: false,
  },
});

const typeStyles: Record<TypographyType, any> = {
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.2,
    color: colors.text.secondary,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  caption: {
    fontSize: 13,
    color: colors.text.muted,
  },
};
