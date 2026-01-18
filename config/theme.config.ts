export const themeConfig = {
  colors: {
    primary: {
      main: "#059669", // Emerald 600
      light: "#34d399", // Emerald 400
      dark: "#047857", // Emerald 700
    },
    secondary: {
      main: "#10b981", // Emerald 500
      light: "#6ee7b7", // Emerald 300
      dark: "#059669", // Emerald 600
    },
    accent: "#f59e0b", // Amber 500
    background: {
      default: "#f3f4f6", // Gray 100
      paper: "#ffffff",
    },
    text: {
      primary: "#111827", // Gray 900
      secondary: "#6b7280", // Gray 500
    },
    border: "#e5e7eb", // Gray 200
    success: "#10b981", // Emerald 500
    warning: "#f59e0b", // Amber 500
    error: "#ef4444", // Red 500
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
} as const;

export type ThemeConfig = typeof themeConfig;
