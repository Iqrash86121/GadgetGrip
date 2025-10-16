// src/contexts/ThemeContext.tsx
import React, { createContext, useContext } from 'react';

export const Colors = {
  primary: '#0a7d6e', 
  secondary: '#090a0c83', // Alibaba blue
  background: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
};

export const ThemeContext = createContext({
  colors: Colors,
});

export const useTheme = () => useContext(ThemeContext);