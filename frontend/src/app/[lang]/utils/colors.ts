import { ColorConfig } from '@/types/colors';

const hexToRgb = (hex: string): string => {
  // Ensure hex is in the correct format
  hex = hex.trim().toLowerCase();
  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }
  
  // Validate hex format
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    console.error(`Invalid hex color format: ${hex}`);
    return '0 0 0'; // Return black as fallback
  }
  
  // Remove the hash
  hex = hex.substring(1);
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Validate the parsed values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error(`Failed to parse hex color: ${hex}`);
    return '0 0 0'; // Return black as fallback
  }
  
  return `${r} ${g} ${b}`;
};

const isRgb = (color: string): boolean => {
  return color.startsWith('rgb(') || color.startsWith('rgb(');
};

const formatRgb = (color: string): string => {
  if (isRgb(color)) {
    // Extract numbers from rgb(r, g, b) format
    const matches = color.match(/\d+/g);
    if (matches && matches.length === 3) {
      return `${matches[0]} ${matches[1]} ${matches[2]}`;
    }
  }
  return hexToRgb(color);
};

export const applyColors = (colors: ColorConfig) => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  // Set CMS color variables
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-muted', colors.muted);

  // Set RGB values for Tailwind opacity support
  root.style.setProperty('--primary', formatRgb(colors.primary));
  root.style.setProperty('--secondary', formatRgb(colors.secondary));
  root.style.setProperty('--accent', formatRgb(colors.accent));
  root.style.setProperty('--background', formatRgb(colors.background));
  root.style.setProperty('--text', formatRgb(colors.text));
  root.style.setProperty('--muted', formatRgb(colors.muted));
};

export const getColorVariables = (colors: ColorConfig) => {
  // Convert hex colors to RGB format
  const rgbPrimary = formatRgb(colors.primary);
  const rgbSecondary = formatRgb(colors.secondary);
  const rgbAccent = formatRgb(colors.accent);
  const rgbBackground = formatRgb(colors.background);
  const rgbText = formatRgb(colors.text);
  const rgbMuted = formatRgb(colors.muted);

  return {
    // CMS color variables
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
    '--color-text': colors.text,
    '--color-muted': colors.muted,
    // RGB values for Tailwind opacity support
    '--primary': rgbPrimary,
    '--secondary': rgbSecondary,
    '--accent': rgbAccent,
    '--background': rgbBackground,
    '--text': rgbText,
    '--muted': rgbMuted,
  };
}; 