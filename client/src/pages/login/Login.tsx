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
import { loginUser, loginProfile } from '../../redux/reducers/userReducer';
import { ErrorModal } from '../../components/infoModal';

const Login: FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setPage }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  // const [sessionUser, setSessionUser] = useState(false)

  const { register, formState, handleSubmit } = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
  });
  const { isDirty, isValid, isSubmitting } = formState;
  const submitData = async (data: LoginInterface) =>
    await dispatch(loginUser(data));
  const profileLogin = async () => await dispatch(loginProfile());

  useEffect(() => {
    // if (!sessionUser) profileLogin()
    if (user.serverError) {
      setOpenModal(true);
    } else if (user.name) navigate(`/${user.name}`);
    // else profileLogin();
  }, [user.serverMessage, user.name, setOpenModal, navigate, dispatch, user.serverError, user]);

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
                />
                <Typography sx={{ mx: '1px', fontSize: '12px' }}>
                  or sign in with
                </Typography>
                <Divider
                  sx={{ borderColor: 'gray', borderWidth: 1, flex: 1 }}
                />
              </Container>
              <Container
                sx={{
                  display: 'flex',
                  justifycontent: 'center',
                  alignItems: 'center',
                  px: '15px',
                }}
              >
                <Button
                  variant='contained'
                  size='small'
                  sx={{ flex: 1 }}
                  onClick={profileLogin}
                >
                  RESUME SESSION
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
        info={user.serverMessage}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Container>
  );
};

export default Login;
