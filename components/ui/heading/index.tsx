import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "@/theme/tokens";

type HeadingLevel = 1 | 2 | 3 | 4 | 5;

interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  style?: any;
  numberOfLines?: number;
}

export function Heading({
  children,
  level = 2,
  style,
  numberOfLines,
  ...rest
}: HeadingProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.base, levelStyles[level], style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
    fontWeight: "700",
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
});

const levelStyles: Record<HeadingLevel, any> = {
  1: { fontSize: 34, letterSpacing: -0.6 },
  2: { fontSize: 28 },
  3: { fontSize: 22 },
  4: { fontSize: 18 },
  5: { fontSize: 16 },
};

export default Heading;
