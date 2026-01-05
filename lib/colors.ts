/**
 * Design System Colors
 *
 * Single source of truth for all colors used in the application.
 * Update values here to change colors across the entire app.
 *
 * Usage:
 * - In Tailwind: colors are automatically available via tailwind.config.ts
 * - In CSS: use CSS custom properties like var(--color-primary)
 * - In JS/TS: import { colors } from '@/lib/colors'
 */

export const colors = {
  // Brand Colors
  primary: {
    DEFAULT: '#0E6EBE',
    dark: '#0B5A9D',
    light: '#3D8ACC',
  },

  secondary: {
    DEFAULT: '#1A2B4A',
    light: '#2A3B5A',
  },

  // Accent Colors (for backgrounds, highlights, etc.)
  accent: {
    blue: '#D4E9FF',
    green: '#D4F5D4',
    pink: '#FFE5E5',
    yellow: '#FFF4D4',
  },

  // Neutral Colors (for text, borders, backgrounds)
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic Colors (for states, feedback)
  success: {
    DEFAULT: '#10B981',
    light: '#D1FAE5',
    dark: '#059669',
  },

  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },

  error: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
  },

  info: {
    DEFAULT: '#3B82F6',
    light: '#DBEAFE',
    dark: '#2563EB',
  },

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
}

// Type for the colors object
export type Colors = typeof colors
