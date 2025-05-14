import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme types
export type ThemeType = 'light' | 'dark';

// Define theme context type
interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get device's default color scheme
  const deviceTheme = useColorScheme();

  // State to track the current theme
  const [theme, setTheme] = useState<ThemeType>(
    deviceTheme === 'dark' ? 'dark' : 'light'
  );

  // Update theme if device theme changes
  useEffect(() => {
    if (deviceTheme) {
      setTheme(deviceTheme as ThemeType);
    }
  }, [deviceTheme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Check if current theme is dark
  const isDark = theme === 'dark';

  // Value to be provided to consumers
  const contextValue = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
