// apps/dashboard/components/ui/Card.tsx
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { tokens } from "../../../theme/tokens";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "muted" | "outline";
}

export function Card({
  children,
  variant = "default",
  style,
  ...props
}: CardProps) {
  return (
    <View style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.radii.md,
    padding: tokens.spacing.md,
    // Ombrage léger pour l'effet élévation demandé
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  default: {
    backgroundColor: tokens.colors.neutral.surface,
    borderWidth: 1,
    borderColor: tokens.colors.neutral.border,
  },
  muted: {
    backgroundColor: tokens.colors.neutral.background,
    borderWidth: 1,
    borderColor: tokens.colors.neutral.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: tokens.colors.neutral.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});
