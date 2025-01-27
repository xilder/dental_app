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
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import DoctorProfile from './doctorComponents/doctorProfile';
import DoctorChat from './doctorComponents/doctorChat';
import DoctorSetting from './doctorComponents/doctorSetting';
import { doctorDrawer } from '../../constants/nav';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { setClient } from '../../redux/reducers/clientReducer';
const Doctor = () => {
  const user = useAppSelector((store) => store.user);
  const client = useAppSelector((store) => store.client);
  const dispatch = useAppDispatch()
  const theme = useTheme();
  const [pageDisplayed, setPageDisplayed] = useState('Profile');
  const handlePageDisplayed = (value: string) => {
    setPageDisplayed(value);
  };
  const [socket] = useState(
    io('http://localhost:5000/chats', { transports: ['websocket'] })
  );

  useEffect(() => {
    dispatch(setClient(socket))
    return () => {
      client.disconnect()
    }
  }, [client, dispatch, socket]);
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
            {doctorDrawer.map((item) => (
              <ListItemButton onClick={() => handlePageDisplayed(item.name)}>
                <ListItemIcon>
                  <Icon component={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
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
            <DoctorChat user={user} client={client} />
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
