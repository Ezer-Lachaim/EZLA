import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    secondary: {
      main: '#007DFF'
    }
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: '#F44336' }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 14
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 14
        },
        root: {
          margin: 0
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: 8
        }
      }
    }
  },
  typography: {
    fontFamily: 'Heebo, sans-serif'
  }
});

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
