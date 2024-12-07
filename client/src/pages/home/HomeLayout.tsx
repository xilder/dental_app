import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { homepageLinks } from '../../constants/nav';
import { Outlet, useNavigate } from 'react-router-dom';
// import { simplifica } from '../fonts';

const HomeLayout = () => {
  const navigate = useNavigate();
  // const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);
  // console.log(theme)
  // console.log(theme.mixins.toolbar);
  // const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setNavMenu(event.currentTarget);
  // };
  // const closeNavMenu = () => {
  //   setNavMenu(null);
  // };
  // console.log(theme.mixins.toolbar)
  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          m: 0,
          p: 0,
          // height: '20px',
          backgroundColor: 'white',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            borderBottom: '2px solid rgba(20, 20, 20, 0.1)',
            px: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Typography
              sx={{ fontSize: '20px', fontWeight: 700, color: '#005969' }}
            >
              epitome
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                // border: "1px solid green",
                width: 'auto',
              }}
            >
              {homepageLinks.map((link) => (
                <Button
                  key={link.page}
                  onClick={() => navigate(link.url)}
                  sx={{ fontWeight: 900 }}
                >
                  {link.page}
                </Button>
              ))}
            </Box>
            <Button
              variant='contained'
              onClick={() => navigate('/accounts')}
              // size='large'
              sx={{ borderRadius: '20px', fontSize: 11, fontWeight: 900 }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default HomeLayout;
