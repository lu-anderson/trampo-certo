import React, { useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { colors, radius, spacing, shadow } from "@/theme/tokens";

type Variant = "solid" | "outline" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: any;
  shadowed?: boolean;
}

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "solid",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = true,
  shadowed = false,
  style,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        shadowed && shadow.card,
        fullWidth && { width: "100%" },
        sizeStyles[size],
        variantStyles[variant],
        pressed && variantPressStyles[variant],
        isDisabled && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "solid" || variant === "soft"
              ? colors.background
              : colors.primary[600]
          }
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <Text
            style={[
              styles.text,
              textStyles[variant],
              size === "sm" && { fontSize: 14 },
              size === "md" && { fontSize: 16 },
              size === "lg" && { fontSize: 18 },
            ]}
          >
            {title}
          </Text>

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
}

/* BASE */
const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    transitionDuration: "120ms",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontWeight: "600",
    color: colors.text.primary,
  },

  iconLeft: {
    marginRight: spacing.sm,
  },

  iconRight: {
    marginLeft: spacing.sm,
  },
});

/* SIZE */
const sizeStyles: Record<Size, any> = {
  sm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
};

/* VARIANTS */
const variantStyles: Record<Variant, any> = {
  solid: {
    backgroundColor: colors.primary[600],
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.6,
    borderColor: colors.primary[600],
  },
  ghost: {
    backgroundColor: "transparent",
  },
  soft: {
    backgroundColor: colors.primary[800],
  },
};

/* PRESS STATES */
const variantPressStyles: Record<Variant, any> = {
  solid: {
    backgroundColor: colors.primary[700],
  },
  outline: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  ghost: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  soft: {
    backgroundColor: colors.primary[700],
  },
};

/* TEXT COLORS */
const textStyles: Record<Variant, any> = {
  solid: {
    color: colors.background,
  },
  outline: {
    color: colors.primary[600],
  },
  ghost: {
    color: colors.primary[500],
  },
  soft: {
    color: colors.primary[300],
  },
};
