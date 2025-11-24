import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "@/theme/tokens";

interface SectionProps {
  children: React.ReactNode;
  style?: any;
}

export function Section({ children, style }: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
});

export default Section;
