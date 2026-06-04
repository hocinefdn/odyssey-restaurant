import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import { tokens } from "../../../theme/tokens";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function InputField({ label, error, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={tokens.colors.neutral.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing.md,
    width: "100%",
  },
  label: {
    fontSize: tokens.typography.sizes.sm,
    fontWeight: tokens.typography.weights.medium,
    color: tokens.colors.brand.primary,
    marginBottom: tokens.spacing.xs,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: tokens.colors.neutral.border,
    borderRadius: tokens.radii.sm,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: tokens.colors.neutral.surface,
    fontSize: tokens.typography.sizes.md,
    color: tokens.colors.brand.primary,
  },
  inputError: {
    borderColor: tokens.colors.semantic.error,
  },
  errorText: {
    fontSize: tokens.typography.sizes.xs,
    color: tokens.colors.semantic.error,
    marginTop: tokens.spacing.xs,
  },
});
