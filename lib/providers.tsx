'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { lightTheme, darkTheme } from './theme/themes';
import { useEffect, useState } from 'react';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [mounted, setMounted] = useState(false);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </Provider>
  );
}