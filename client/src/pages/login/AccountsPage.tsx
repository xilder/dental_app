import { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import Login from './Login';
import Register from './Register';

const AccountsPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState('login');

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // border: '1px red solid',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          ...theme.mixins.toolbar,
        }}
      ></Box>
      {page === 'login' ? (
        <Login setPage={setPage} />
      ) : page === 'register' ? (
        <Register setPage={setPage} />
      ) : (
        ''
      )}
      {/* <Button
        onClick={() =>
          page === 'register' ? setPage('login') : setPage('register')
        }
      >
        {page}
      </Button> */}
    </Container>
  );
};

export default AccountsPage;
