import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CircleIcon from '@mui/icons-material/Circle';
import axiosClient from '../../../axiosClient/axiosClient';
import { getProfileAction, reset } from '../../../redux/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';

const PatientProfile = () => {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosClient.get(`/api/v1/auth/profile`);
        const userProfile = await response.data;
        dispatch(getProfileAction(userProfile));
        console.log(user);
      } catch {
        dispatch(reset());
      }
    };
    // const getDoctors = async () => {
    //   try {
    //     const response = await axiosClient.get('/api/v1/resources/doctors');
    //     const doctorList: [] = await response.data;
    //     setDoctors(doctorList);
    //     console.log(doctors);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    getProfileData();
    if (!user.id) navigate('/accounts');
    // getDoctors();
  }, [dispatch, user, doctors, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        px: '10px',
      }}
    >
      <Box>
        <Typography variant='h4'>Hello {user.first_name}</Typography>
      </Box>
      <Divider sx={{ mt: '5px' }}></Divider>
      <Box
        sx={{
          // border: '1px solid red',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
          mt: '10px',
          overflowY: 'scroll',
          maxHeight: '350px',
        }}
      >
        <Typography variant='h5' sx={{ mt: '15px' }}>
          Book an appointment
        </Typography>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            sx={{
              height: '90px',
              width: '90px',
              borderRadius: '50%',
              // border: '1px solid red',
            }}
          ></CardMedia>
          <CardContent>
            <Typography variant='h5'>Name</Typography>
            <Typography variant='body2'>Title</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant='contained' size='small' sx={{ mr: '5px' }}>
                BOOK CONSULT
              </Button>
              <Button variant='contained' size='small'>
                CHAT
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          height: '200px',
          overflowY: 'scroll',
          maxHeight: '250px',
          // border: '2px solid grey',
          width: '100%',
          // pl: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonthIcon />
          <Typography variant='h6' sx={{ flex: 1, ml: '2px' }}>
            HISTORY
          </Typography>
        </Box>
        <Divider></Divider>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              m: '5px',
            }}
          >
            <CircleIcon sx={{ fontSize: '10px', mb: '5px' }} />
            <Divider orientation='vertical' sx={{ flex: 1 }}></Divider>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              m: '5px',
            }}
          >
            <Typography>Type</Typography>
            <Typography>Doctor</Typography>
            <Typography>Time</Typography>
            <Typography>Details</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientProfile;
