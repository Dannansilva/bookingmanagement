export const themeConfig = {
  colors: {
    primary: {
      main: '#1e293b',
      light: '#334155',
      dark: '#0f172a',
    },
    secondary: {
      main: '#c9a962',
      light: '#d4b978',
      dark: '#b8944d',
    },
    accent: '#c9a962',
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    border: '#e2e8f0',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
} as const;

export type ThemeConfig = typeof themeConfig;
