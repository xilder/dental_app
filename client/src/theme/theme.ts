import { createTheme } from '@mui/material';
// import '../fonts/'

const theme = createTheme({
  palette: {
    primary: {
      main: '#005C6D',
    },
  },
  typography: {
    button: { fontSize: 12 },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '11px',
            height: '24px',
          },
          // border: '1px solid grey',
          // borderRadius: '15px',
          // px: '25px'
        },
      },
    },
  },
});
// console.log(theme);

export default theme;
