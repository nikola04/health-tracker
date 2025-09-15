import { Platform } from 'react-native';

export interface ThemeColors {
  text: string;
  background: string;
  backgroundAlt: string;
  primary: string;
  primaryAlt: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const customColors = {
    primary: '#88e066',
    primaryAlt: '#b6f299'
}

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    text: '#2E2C2F',
    background: '#f1f1f1',
    backgroundAlt: '#ffffff',
    primary: customColors.primary,
    primaryAlt: customColors.primaryAlt,
    tint: customColors.primary,
    icon: '#5f6368',
    tabIconDefault: '#9aa0a6',
    tabIconSelected: customColors.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#121212',
    backgroundAlt: '#1E1E1E',
    primary: customColors.primary,
    primaryAlt: customColors.primaryAlt,
    tint: customColors.primary,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
