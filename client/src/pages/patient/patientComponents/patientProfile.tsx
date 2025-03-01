import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CircleIcon from '@mui/icons-material/Circle';
import UserData, { AppointmentDoctorData } from '../../../interfaces/userData';
import { AppointmentSummary } from '../../../interfaces/appointmentData';
import axiosClient from '../../../axiosClient/axiosClient';
import PatientAppointment from './patientProfileComponents/patientAppointment';
import { getProfileAction, reset } from '../../../redux/reducers/userReducer';
import { useAppDispatch } from '../../../hooks/storeHooks';

const PatientProfile: FC<{ user: UserData }> = ({ user }) => {
  // const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dialogID, setDialogID] = useState<string>('');
  const [doctors, setDoctors] = useState<AppointmentDoctorData[]>([]);
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosClient.get(`/api/v1/auth/profile`);
        const userProfile = await response.data;
        dispatch(getProfileAction(userProfile));
        // console.log(user);
      } catch {
        dispatch(reset());
      }
    };
    const getDoctors = async () => {
      try {
        const response = await axiosClient.get('/api/v1/resources/doctors');
        const doctorList: [] = await response.data;
        setDoctors(doctorList);
        // console.log(doctorList);
      } catch (e) {
        console.log(e);
      }
    };
    const getAppointments = async () => {
      try {
        const response = await axiosClient.get(`/api/v1/resources/patient_appointments/${user.id}`);
        const appointmentList: AppointmentSummary[] = await response.data;
        setAppointments(appointmentList);
      } catch (e) {
        console.log(e);
      }
    }
    getProfileData();
    getDoctors();
    getAppointments();
    if (!user.id) navigate('/accounts');
    // getDoctors();
  }, [dispatch, user.id, navigate, setDoctors, setAppointments]);
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
          height: '300px',
          maxHeight: '350px',
        }}
      >
        <Typography variant='h5' sx={{ mt: '15px' }}>
          Book an appointment
        </Typography>
        <Box>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <Card key={doctor.id} sx={{ display: 'flex' }}>
                <CardMedia
                  src='https://unsplash.com/photos/1e0vzv8Jv6M'
                  sx={{
                    height: '90px',
                    width: '90px',
                    borderRadius: '50%',
                    // border: '1px solid red',
                  }}
                ></CardMedia>
                <CardContent>
                  <Typography variant='h5'>{`${doctor.first_name} ${doctor.last_name}`}</Typography>
                  <Typography variant='body2'>{}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{ mr: '5px' }}
                      onClick={() => setDialogID(doctor.id)}
                    >
                      BOOK CONSULT
                    </Button>
                    <Button variant='contained' size='small'>
                      CHAT
                    </Button>
                    <Dialog
                      open={doctor.id === dialogID}
                      onClose={() => setDialogID('')}
                      // scroll='paper'
                      fullWidth
                      // maxWidth={false}
                    >
                      <DialogTitle>
                        SET APPOINTMENT WITH DR.
                        {` ${doctor.first_name.toUpperCase()} ${doctor.last_name.toUpperCase()}`}
                      </DialogTitle>
                      <DialogContent dividers>
                        <PatientAppointment
                          doctor_id={doctor.id}
                          patient_id={user.id}
                          setDialogID={setDialogID}
                        />
                      </DialogContent>
                    </Dialog>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant='h4'>No doctors available</Typography>
          )}
        </Box>
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
        <Box>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <>
                <Divider />
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
                    <Typography>{appointment.doctor_name}</Typography>
                    <Typography>{appointment.complaints}</Typography>
                    <Typography>{appointment.time}</Typography>
                  </Box>
                </Box>
              </>
            ))
          ) : (
            <Typography component='h5'>
              No appointments made. Click on the "Book Consult" button to make
              appointments with a doctor
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientProfile;
