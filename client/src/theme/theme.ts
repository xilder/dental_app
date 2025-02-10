import { createTheme, responsiveFontSizes } from '@mui/material';
// import '../fonts/'

let theme = createTheme({
  palette: {
    primary: {
      main: '#0C8C6C',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#F44336',
    },
  },
  typography: {
    fontSize: 12,
    // fontFamily: [
    //   '"Bricolage Grotesque"',
    //   'Poppins',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   '"Segoe UI Emoji"',
    // ].join(','),
    h1: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    h2: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    h3: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    h4: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    h5: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    h6: { fontFamily: ['Poppins', 'Roboto'].join(',') },
    body1: { fontFamily: ['"Bricolage Grotesque"', 'Arial'].join(',') },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '11px',
            height: '24px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: ['Poppins', 'Roboto'].join(','),
        },
      },
    },
  },
});
// console.log(theme);
theme = responsiveFontSizes(theme);

export default theme;
