export const tokens = {
  colors: {
    brand: {
      primary: "#0F172A", // Slate 900
      primaryHover: "#1E293B",
      accent: "#2563EB", // Blue 600
      accentHover: "#1D4ED8",
    },
    neutral: {
      background: "#F8FAFC", // Slate 50
      surface: "#FFFFFF",
      border: "#E2E8F0", // Slate 200
      textPrimary: "#0F172A",
      textSecondary: "#64748B", // Slate 500
      disabled: "#CBD5E1", // Slate 300
    },
    semantic: {
      success: "#10B981", // Emerald 500
      successBg: "#D1FAE5",
      warning: "#F59E0B", // Amber 500
      warningBg: "#FEF3C7",
      error: "#EF4444", // Red 500
      errorBg: "#FEE2E2",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    weights: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
  },
};
