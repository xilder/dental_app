import React, { useEffect, useState, FC } from 'react';
import {
  Button,
  Container,
  Divider,
  Slide,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import LoginInterface from '../../interfaces/loginData';
import { loginSchema } from '../../constants/schema';
import { loginUser, loginProfile, getProfileAction } from '../../redux/reducers/userReducer';
import { ErrorModal } from '../../components/infoModal';
import axiosClient from '../../axiosClient/axiosClient';

const Login: FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setPage }) => {
  const theme = useTheme();
  // this variable is used by the useEffect page to navigate to the profile page. Used together with the changes in user to determine if login was successful
  const [switchPage, setSwitchPage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // console.log(switchPage)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const { register, formState, handleSubmit } = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
  });
  const { isDirty, isValid, isSubmitting } = formState;
  const submitData = async (data: LoginInterface) => {
    await dispatch(loginUser(data));
    setSwitchPage(true);
    // console.log(user)
  };

  // TODO: fix automatic login
  const profileLogin = async () => {
    try {
      // const response = await axiosClient.get('api/v1/auth/profile');
      // dispatch(getProfileAction(response.data))
      await dispatch(loginProfile());
      console.log(user)
    } catch (e: any) {
      console.log(e)
      // return thunkApi.rejectWithValue(e.response.data);
    }
  }

  useEffect(() => {
    // console.log({ ...user, switchPage });
    if (user.serverResponse?.error) {
      setSwitchPage(false);
      setOpenModal(true);
    }
    // user is supposed to be change if login was successful
    if (!user.serverResponse?.error && switchPage) {
      setSwitchPage(false);
      // navigates to the profile page
      if (user.first_name) navigate(`/${user.name}`);
      // console.log(user)
    }
  }, [
    user.serverResponse?.error,
    user.first_name,
    user.name,
    switchPage,
    setSwitchPage,
    setOpenModal,
    navigate,
    dispatch,
  ]);

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
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          // border: '2px green solid',
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // my: '70px'
        }}
      >
        <Slide in={true} direction='up'>
          <Container>
            <Container
              disableGutters
              sx={{
                px: '20%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // border: '1px solid black'
              }}
            >
              <Typography variant='h4' sx={{ textAlign: 'center', mb: '20px' }}>
                Sign in
              </Typography>
              <Container>
                <form onSubmit={handleSubmit(submitData)}>
                  <Stack spacing={1}>
                    <TextField
                      size='small'
                      label='EMAIL OR USERNAME'
                      variant='standard'
                      sx={{ fontSize: '20px' }}
                      {...register('data')}
                    />
                    <TextField
                      size='small'
                      label='PASSWORD'
                      variant='standard'
                      type='password'
                      sx={{ fontSize: '20px' }}
                      {...register('password')}
                    />
                    <Button
                      disabled={!isDirty || !isValid || isSubmitting}
                      type='submit'
                      variant='contained'
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
              </Container>
              <Container
                sx={{
                  // border: '2px green solid',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: '5px',
                }}
              >
                <Divider
                  sx={{ borderColor: 'gray', borderWidth: 1, flex: 1 }}
                ></Divider>
                <Typography sx={{ mx: '1px', fontSize: '12px' }}>
                  or sign in with
                </Typography>
                <Divider
                  sx={{ borderColor: 'gray', borderWidth: 1, flex: 1 }}
                ></Divider>
              </Container>
              <Container
                sx={{
                  display: 'flex',
                  justifycontent: 'center',
                  alignItems: 'center',
                  px: '15px',
                }}
              >
                <Button variant='contained' size='small' sx={{ flex: 1 }} onClick={profileLogin}>
                  GOOGLE
                </Button>
              </Container>
            </Container>
          </Container>
        </Slide>
        <Slide in={true} direction='right'>
          <Container
            sx={{
              // border: '1px red solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              // borderRadius: '20% 0 0 20%',
              ml: '70px',
            }}
          >
            <Container
              sx={{
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h4' sx={{ mb: '20px', textAlign: 'center' }}>
                Hello, Friend
              </Typography>
              <Typography
                component='h2'
                sx={{
                  textAlign: 'center',
                }}
              >
                Register now to access optimal dental care from the comfort of
                your home
              </Typography>
              <Button
                variant='outlined'
                sx={{ backgroundColor: 'white', mt: '15px' }}
                onClick={() => setPage('register')}
              >
                REGISTER
              </Button>
            </Container>
          </Container>
        </Slide>
      </Container>
      <ErrorModal
        info={user.serverResponse?.message}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Container>
  );
};

export default Login;
