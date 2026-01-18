export const themeConfig = {
  colors: {
    primary: {
      main: "#0d9488", // Teal 600
      light: "#2dd4bf", // Teal 400
      dark: "#0f766e", // Teal 700
    },
    secondary: {
      main: "#14b8a6", // Teal 500
      light: "#5eead4", // Teal 300
      dark: "#0d9488", // Teal 600
    },
    accent: "#f59e0b", // Amber 500
    background: {
      default: "#f8fafc", // Slate 50
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
