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
  border: '2px solid #F00',
  boxShadow: 24,
  p: 4,
};

const InfoModal: React.FC<{
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
        <Box sx={style}>
          <Typography variant='h6' component='h2' sx={{ textAlign: 'center' }}>
            Error!
          </Typography>
          <Divider sx={{ bgColor: '#FOO', color: '#FOO', fontSize: '5px'}} />{' '}
          <Typography sx={{ mt: 2 }}>{info}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoModal;
