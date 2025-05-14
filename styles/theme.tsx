import { ThemeType } from '@/context/ThemeContext';

export type ThemeColors = {
  background: string;
  text: string;
  secondaryText: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
  success: string;
  error: string;
  inputBackground: string;
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
  switch: {
    track: {
      false: string;
      true: string;
    };
    thumb: {
      false: string;
      true: string;
    };
  };
};

export const colors: Record<ThemeType, ThemeColors> = {
  light: {
    background: '#F3F4F6',
    text: '#1F2937',
    secondaryText: '#6B7280',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#2563EB',
    secondary: '#4B5563',
    success: '#10B981',
    error: '#EF4444',
    inputBackground: '#F9FAFB',
    tabBar: '#FFFFFF',
    tabBarActive: '#2563EB',
    tabBarInactive: '#6B7280',
    switch: {
      track: {
        false: '#E5E7EB',
        true: '#BFDBFE',
      },
      thumb: {
        false: '#9CA3AF',
        true: '#2563EB',
      },
    },
  },
  dark: {
    background: '#111827',
    text: '#F9FAFB',
    secondaryText: '#9CA3AF',
    card: '#1F2937',
    border: '#374151',
    primary: '#3B82F6',
    secondary: '#9CA3AF',
    success: '#34D399',
    error: '#F87171',
    inputBackground: '#374151',
    tabBar: '#1F2937',
    tabBarActive: '#60A5FA',
    tabBarInactive: '#9CA3AF',
    switch: {
      track: {
        false: '#4B5563',
        true: '#93C5FD',
      },
      thumb: {
        false: '#9CA3AF',
        true: '#3B82F6',
      },
    },
  },
};

// Utility function to get the colors based on current theme
export const getColors = (theme: ThemeType): ThemeColors => {
  return colors[theme];
};
