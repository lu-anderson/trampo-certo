import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme/tokens";

interface TabItem {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  active?: boolean;
}

export function BottomTabs({ items }: { items: TabItem[] }) {
  return (
    <View style={styles.base}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          style={[styles.item, item.active && styles.active]}
        >
          {item.icon}

          <Text
            style={[
              styles.label,
              item.active && styles.labelActive,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface.primary,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  item: {
    alignItems: "center",
    gap: 4,
  },
  active: {
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  labelActive: {
    color: colors.primary[500],
    fontWeight: "600",
  },
});
