import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { patientDrawer } from '../../constants/nav';
import PatientProfile from './patientComponents/patientProfile';
import PatientChat from './patientComponents/patientChat';
import PatientSetting from './patientComponents/patientSetting';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers/userReducer';
import { ChatMessage } from '../../interfaces/message';
import PatientContextProvider from './patientContext';
import axiosClient from '../../axiosClient/axiosClient';
import { AppointmentSummary } from '../../interfaces/appointmentData';
import { AppointmentDoctorData } from '../../interfaces/userData';
// import axiosClient from '../../axiosClient/axiosClient';

const Patient = () => {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [pageDisplayed, setPageDisplayed] = useState('Profile');
  const [doctors, setDoctors] = useState<AppointmentDoctorData[]>([]);
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [messages, setMessages] = useState(
    {} as { [key: string]: ChatMessage[] }
  );
  const [receiverID, setReceiverID] = useState('');
  const [chatState, setChatState] = useState({ changed: false, error: false });
  const handlePageDisplayed = (value: string) => setPageDisplayed(value);
  const client = io('http://localhost:5000/chats', {
    transports: ['websocket'],
  });

  useEffect(() => {
    if (!user.name) navigate('/accounts');
    const getDoctors = async () => {
      try {
        const response = await axiosClient.get('/api/v1/resources/doctors');
        const doctorList: AppointmentDoctorData[] = await response.data;
        setDoctors(doctorList);
      } catch (e) {
        setDoctors([]);
      }
    };
    const getAppointments = async () => {
      try {
        const response = await axiosClient.get(
          `/api/v1/resources/patient_appointments`
        );
        const appointmentList: AppointmentSummary[] = await response.data;
        setAppointments(appointmentList);
      } catch (e) {
        setAppointments([]);
      }
    };
    const getChatMessages = async () => {
      try {
        const response = await axiosClient.get('/api/v1/chat/chat_list');
        const messagesList = response.data;
        setMessages({ ...messagesList });
        setChatState({ changed: true, error: false });
      } catch (e) {
        console.log(e);
        setChatState({ changed: true, error: true });
      }
    };
    getDoctors();
    getAppointments();
    getChatMessages();
  }, [chatState.changed, navigate, user.name]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          ...theme.mixins.toolbar,
          // border: '1px solid red'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
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
            // pt: '20px',
            // border: '10px solid black',
            // borderRight: '1px solid black',
          }}
        >
          <List>
            {patientDrawer.map((item) => (
              <ListItemButton
                key={item.name}
                onClick={() => {
                  handlePageDisplayed(item.name);
                }}
              >
                <ListItemIcon>
                  <Icon component={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.name.toUpperCase()} />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={async () => {
                await dispatch(logoutUser());
              }}
            >
              <ListItemIcon>
                <Icon component={LogoutIcon} />
              </ListItemIcon>
              <ListItemText primary={'LOGOUT'} />
            </ListItemButton>
          </List>
        </Box>
        <Box
          sx={{
            flex: 1,
            // border: '1px, solid red',
            // borderLeft: '1px solid black',
            // maxHeight: '100%',
            width: '100%',
          }}
        >
          <PatientContextProvider
            messages={messages}
            setMessages={setMessages}
            client={client}
            doctors={doctors}
            appointments={appointments}
          >
            {pageDisplayed === 'Profile' ? (
              <PatientProfile />
            ) : pageDisplayed === 'Chat' ? (
              <PatientChat
                receiverID={receiverID}
                setReceiverID={setReceiverID}
              />
            ) : pageDisplayed === 'Setting' ? (
              <PatientSetting />
            ) : (
              <PatientProfile />
            )}
          </PatientContextProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Patient;
