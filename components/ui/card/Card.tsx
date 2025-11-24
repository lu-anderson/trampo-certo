import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius, spacing, shadow } from "@/theme/tokens";

interface CardProps {
  children: React.ReactNode;
  style?: any;
  padded?: boolean;
  elevated?: boolean;
}

export function Card({
  children,
  style,
  padded = true,
  elevated = true,
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        elevated && shadow.card,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface.primary,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },

  padded: {
    padding: spacing.lg,
  },
});

export default Card;
