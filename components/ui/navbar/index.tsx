import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme/tokens";

export function Navbar({ title }: { title: string }) {
  return (
    <View style={styles.base}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
});
