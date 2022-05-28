import { createTheme } from '@mui/material'
import { SxProps } from '@mui/system'

export const generateSxStyles = <T = unknown>(
  params: Record<keyof T, SxProps<typeof theme>> | T
): Record<keyof T, SxProps<typeof theme>> | T => params

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: '#9a3412',
      contrastText: '#fff',
      light: '#AE5C41',
      dark: '#6B240C',
    },
    secondary: {
      main: '#12789A',
      contrastText: '#fff',
      light: '#4193AE',
      dark: '#0C546B',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Josefin Sans',
      fontSize: '96px',
      lineHeight: 1.19,
      letterSpacing: '-1.5px',
      fontWeight: 'normal',
    },
    h2: {
      fontFamily: 'Josefin Sans',
      fontSize: '60px',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      fontWeight: 'normal',
    },
    h3: {
      fontFamily: 'Josefin Sans',
      fontSize: '48px',
      lineHeight: 1.17,
      letterSpacing: 'normal',
      fontWeight: 'normal',
    },
    h4: {
      fontFamily: 'Josefin Sans',
      fontSize: '34px',
      lineHeight: '42px',
      letterSpacing: '0.25px',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Josefin Sans',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Josefin Sans',
      fontSize: '20px',
      lineHeight: 1.6,
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'Josefin Sans',
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: 1.75,
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontFamily: 'Josefin Sans',
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: 1.75,
      letterSpacing: '0.15px',
    },
    body1: {
      fontFamily: 'Josefin Sans',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    body2: {
      fontFamily: 'Josefin Sans',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.15px',
    },
    caption: {
      fontFamily: 'Josefin Sans',
      fontSize: '12px',
      lineHeight: 1.67,
      letterSpacing: '0.4px',
    },
    overline: {
      fontFamily: 'Josefin Sans',
      fontSize: '10px',
      lineHeight: 3.2,
      letterSpacing: '1.5px',
    },
  },
})
