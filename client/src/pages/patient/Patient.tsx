import React, { useEffect, useState } from 'react';
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
import { patientDrawer } from '../../constants/nav';
import PatientProfile from './patientComponents/patientProfile';
import PatientChat from './patientComponents/patientChat';
import PatientSetting from './patientComponents/patientSetting';
import { useAppSelector } from '../../hooks/storeHooks';
import { useNavigate } from 'react-router-dom';

const Patient = () => {
  const theme = useTheme();
  const [pageDisplayed, setPageDisplayed] = useState('Profile');
  const handlePageDisplayed = (value: string) => {
    setPageDisplayed(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        flexDirection: 'column'
      }}
    >
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
          height: '100%',
          width: '100%'
          // border: '5px solid green',
        }}
      >
        <Box
          sx={{
            width: '150px',
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
            // pt: '20px',
            // border: '10px solid black',
            borderRight: '2px solid black',
          }}
        >
          <List>
            {patientDrawer.map((item) => (
              <ListItemButton
                onClick={() => {
                  handlePageDisplayed(item.name);
                }}
              >
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
            // border: '1px, solid red',
            borderLeft: '1px solid black',
            height: '100%',
            width: '100%',
          }}
        >
          {pageDisplayed === 'Profile' ? (
            <PatientProfile />
          ) : pageDisplayed === 'Chat' ? (
            <PatientChat />
          ) : pageDisplayed === 'Setting' ? (
            <PatientSetting />
          ) : (
            <PatientProfile />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Patient;
