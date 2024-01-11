import React, { createContext, useContext, useMemo } from 'react';
import { ToasterProvider } from '@/contexts/toaster-provider';

const colors = {
  white: 'white',
  pink: {
    '100': '#DBC6D1',
    '200': '#F8BDDC',
    '450': '#FA008A',
    '500': '#E4017E',
    '900': '#A5005B',
    '950': '#900568',
  },
  blue: {
    '100': '#EBF9FA',
    '200': '#E1F7F8',
    '300': '#B9E0E2',
    '500': '#525D87',
    '600': '#39507C',
    '700': '#1B316B',
    '750': '#222D4B',
    '800': '#232448',
  },
  gray: {
    '100': '#CFCFE2',
    '200': '#C4C4C4',
    '250': '#C3CBDA',
    '300': '#E4EDF599',
  },
};

const borderRadius = {
  sm: 6,
  md: 8,
};

export interface Theme {
  colors: typeof colors;
  borderRadius: typeof borderRadius;
}

export const defaultTheme: Theme = {
  colors,
  borderRadius,
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: JSX.Element;
  theme: Theme;
}): JSX.Element => {
  return (
    <ThemeContext.Provider value={useMemo(() => theme, [theme])}>
      <ToasterProvider>{children}</ToasterProvider>
    </ThemeContext.Provider>
  );
};
