
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps as NextThemeProviderProps } from "next-themes"

export interface ThemeProviderProps extends Omit<NextThemeProviderProps, 'attribute'> {
  children: React.ReactNode;
  defaultTheme?: string;
  attribute?: string | "class" | "data-theme";
  enableSystem?: boolean;
  storageKey?: string;
  forcedTheme?: string;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
