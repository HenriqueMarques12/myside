export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  border: string;
  cardBackground: string;
  headerBackground: string;
  footerBackground: string;
  textPrimary: string;
  textSecondary: string;
}