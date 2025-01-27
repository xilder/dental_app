import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { reset } from '../redux/reducers/userReducer';
import { useAppDispatch } from '../hooks/storeHooks';
import { Divider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ErrorModal: React.FC<{
  info: string | undefined;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ info, openModal, setOpenModal }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => {
          dispatch(reset());
          setOpenModal(false);
        }}
        aria-labelledby='account authentication error'
        aria-describedby='error accessing the server'
      >
        <Box sx={{ ...style, border: '2px solid #F00' }}>
          <Typography variant='h6' component='h2' sx={{ textAlign: 'center' }}>
            ERROR!
          </Typography>
          <Divider sx={{ borderColor: '#F00', fontSize: '5px' }} />{' '}
          <Typography sx={{ mt: 2 }}>{info}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

const InfoModal: React.FC<{
  email?: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  info?: string;
}> = ({ email, openModal, setOpenModal, info }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => {
          dispatch(reset());
          setOpenModal(false);
        }}
        aria-labelledby='account authentication error'
        aria-describedby='error accessing the server'
      >
        <Box sx={{ ...style, border: '2px solid #0F0' }}>
          <Typography variant='h6' component='h2' sx={{ textAlign: 'center' }}>
            INFO
          </Typography>
          <Divider sx={{ borderColor: '#0F0', fontSize: '5px' }} />{' '}
          <Typography sx={{ mt: 2 }}>
            {info
              ? info
              : `PLEASE CHECK YOUR EMAIL (${email}) FOR CONFIRMATION LINK`}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export { InfoModal, ErrorModal };
