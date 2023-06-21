'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl'
});

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

export const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="relative flex-1 bg-white max-h-full overflow-auto">{children}</div>
      </ThemeProvider>
    </CacheProvider>
  );
};
