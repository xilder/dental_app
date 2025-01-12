import React, { useState, useEffect } from 'react';
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
import { registerUser } from '../../redux/reducers/userReducer';
import { InfoModal, ErrorModal } from '../../components/infoModal';
import RegistrationInterface from '../../interfaces/registrationData';
import { registerSchema } from '../../constants/schema';
const Register: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setPage }) => {
  const theme = useTheme();
  // allows enables navigation for this page to the next page
  const [email, setEmail] = useState('');
  const [switchPage, setSwitchPage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'info' | 'error'>('info');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm<RegistrationInterface>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const submitData = async (data: RegistrationInterface) => {
    await dispatch(registerUser(data));
    setEmail(data.email);
    setSwitchPage(true);
  };

  useEffect(() => {
    if (user.serverResponse?.error) {
      setSwitchPage(false);
      setModalType('error');
      setOpenModal(true);
    }
    if (!user.serverResponse?.error && switchPage) {
      setSwitchPage(false);
      setModalType('info');
      setOpenModal(true);
      console.log(modalType)
    }
  }, [user, switchPage, navigate, setOpenModal, email, modalType]);

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
          //   border: '2px green solid',
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // my: '70px'
        }}
      >
        <Slide in={true} direction='left'>
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
              // ml: '70px',
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
                onClick={() => setPage('login')}
              >
                LOGIN
              </Button>
            </Container>
          </Container>
        </Slide>
        <Slide in={true} direction='down'>
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
                Create an account
              </Typography>
              <Container>
                <form onSubmit={handleSubmit(submitData)}>
                  <Stack>
                    <Container
                      maxWidth={false}
                      disableGutters
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <TextField
                        size='small'
                        label='FIRST NAME'
                        variant='standard'
                        {...register('first_name')}
                        error={errors.first_name ? true : false}
                        helperText={errors.first_name?.message}
                        sx={{ mr: '10px', fontSize: '20px' }}
                      />
                      <TextField
                        size='small'
                        label='LAST NAME'
                        variant='standard'
                        {...register('last_name')}
                        error={errors.last_name ? true : false}
                        helperText={errors.last_name?.message}
                      />
                    </Container>
                    <TextField
                      size='small'
                      label='USERNAME'
                      variant='standard'
                      {...register('username')}
                      error={errors.username ? true : false}
                      helperText={errors.username?.message}
                    />
                    <TextField
                      size='small'
                      label='EMAIL'
                      variant='standard'
                      {...register('email')}
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                    />
                    <TextField
                      size='small'
                      label='PASSWORD'
                      variant='standard'
                      {...register('password')}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                    />
                    <TextField
                      size='small'
                      label='CONFIRM PASSWORD'
                      variant='standard'
                      {...register('confirm_password')}
                      error={errors.confirm_password ? true : false}
                      helperText={errors.confirm_password?.message}
                    />
                    <Button
                      disabled={!isDirty || !isValid || isSubmitting}
                      type='submit'
                      variant='contained'
                    >
                      Create account
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
                  or sign up with
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
                <Button variant='contained' size='small' sx={{ flex: 1 }}>
                  GOOGLE
                </Button>
              </Container>
            </Container>
          </Container>
        </Slide>
      </Container>
      {modalType === 'info' ? (
        <InfoModal
          email={email}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      ) : (
        <ErrorModal
          info={user.serverResponse?.message}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </Container>
  );
};

export default Register;
