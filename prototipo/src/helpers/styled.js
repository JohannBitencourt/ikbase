import { createMuiTheme } from '@material-ui/core/styles'

 export const styled = createMuiTheme({
  palette: {
    primary: {
      main: '#ffca28',
      contrastText: '#000',
    },
    secondary: {
      main: '#f44336',
      contrastText: '#fff',
    },
  },
});

export const styledColors = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f44336',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});