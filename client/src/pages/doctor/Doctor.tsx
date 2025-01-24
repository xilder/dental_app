import {
  Box,
  Container,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import DoctorProfile from './doctorComponents/doctorProfile';
import DoctorChat from './doctorComponents/doctorChat';
import DoctorSetting from './doctorComponents/doctorSetting';
import { patientDrawer } from '../../constants/nav';
const Doctor = () => {
  const theme = useTheme();
  const [pageDisplayed, setPageDisplayed] = useState('Profile');
  const handlePageDisplayed = (value: string) => {
    setPageDisplayed(value);
  };
  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          ...theme.mixins.toolbar,
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          // border: '5px solid green',
        }}
      >
        <Box
          sx={{
            width: '150px',
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
            pt: '20px',
            flexDirection: 'column',
          }}
        >
          <List>
            {patientDrawer.map((item) => (
              <ListItemButton onClick={() => handlePageDisplayed(item.name)}>
                <ListItemIcon>
                  <Icon component={item.icon}></Icon>
                </ListItemIcon>
                <ListItemText primary={item.name}></ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            // border: '1px, solid red',
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            p: '20px 0 10px 10px',
          }}
        >
          {pageDisplayed === 'Profile' ? (
            <DoctorProfile />
          ) : pageDisplayed === 'Chat' ? (
            <DoctorChat />
          ) : pageDisplayed === 'Setting' ? (
            <DoctorSetting />
          ) : (
            <DoctorProfile />
          )}
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
};

export default Doctor;
