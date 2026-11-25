/**
 * Global Theme Configuration
 * Extracted directly from reference palette with Devzel studio gray background:
 * - Primary: Soft cyan / teal (#9be3df)
 * - Secondary: Very light cyan (#beeae9)
 * - Accent: Soft pastel pink (#ffe4ed)
 * - Background: Studio Warm Gray (#eae8e4)
 * - White/Card: Pure White (#ffffff)
 */

export const THEME_COLORS = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
} as const;

export const THEME_HEX_VALUES = {
  primary: '#9be3df',
  secondary: '#beeae9',
  accent: '#ffe4ed',
  background: '#eae8e4',
  surface: '#f5f4f0',
  white: '#ffffff',
} as const;

export type ThemeColorKey = keyof typeof THEME_COLORS;
