import React from "react";
import { StyleSheet, View, ViewProps, DimensionValue } from "react-native";
import { tokens } from "../../../theme/tokens";

interface SkeletonProps extends ViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  variant?: "rectangle" | "circle";
}

export function Skeleton({
  width = "100%",
  height = 20,
  variant = "rectangle",
  style,
  ...props
}: SkeletonProps) {
  const circleStyle =
    variant === "circle" && typeof height === "number"
      ? { borderRadius: height / 2 }
      : variant === "circle"
        ? { borderRadius: 9999 }
        : null;

  return (
    <View
      style={[styles.base, { width, height }, circleStyle, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: tokens.colors.neutral.border,
    borderRadius: tokens.radii.sm,
    opacity: 0.6,
  },
});
