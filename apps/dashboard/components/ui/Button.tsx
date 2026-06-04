import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { tokens } from "../../../theme/tokens";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "accent" | "danger" | "success";
  isLoading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  isLoading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isInteractionDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        isInteractionDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      disabled={isInteractionDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={[styles.text, variant === "success" && styles.textDark]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    borderRadius: tokens.radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.lg,
    cursor: "pointer",
  },
  primary: {
    backgroundColor: tokens.colors.brand.primary,
  },
  accent: {
    backgroundColor: tokens.colors?.brand?.accent || tokens.colors.brand.accent,
  },
  danger: {
    backgroundColor: tokens.colors.semantic.error,
  },
  success: {
    backgroundColor: tokens.colors.semantic.success,
  },
  disabled: {
    backgroundColor: tokens.colors.neutral.disabled,
    cursor: "pointer",
  },
  text: {
    color: "#FFFFFF",
    fontSize: tokens.typography.sizes.sm,
    fontWeight: tokens.typography.weights.semibold,
  },
  textDark: {
    color: tokens.colors.brand.primary,
  },
});
