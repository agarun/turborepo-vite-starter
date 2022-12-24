import { createTheme } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: purple,
    secondary: grey,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },

  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },

  brand: {
    primary: {
      light: '#98c0fd',
      400: '#2985e2',
      main: '#0968c3',
      dark: '#064785'
    },
    secondary: {
      main: '#737373'
    }
  }
});
