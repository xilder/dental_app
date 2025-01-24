import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const DoctorProfile = () => {
  return <>
  <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
    <CardMedia
      sx={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '1px solid black',
        m: '5px',
      }}
    ></CardMedia>
    <CardContent>
      <Typography variant='h5'>Name</Typography>
      <Typography>Specialty</Typography>
      <Typography>About</Typography>
    </CardContent>
  </Card>
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '250px',
    my: '10px',
    overflowY: 'scroll',
    // border: '1px solid red',
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      mb: '10px',
      // border: '1px solid red',
    }}
  >
    <Typography variant='h4'>Upcoming Appointments:</Typography>
  </Box>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // border: '1px solid red',
    }}
  >
    Nothing to show here
  </Box>
</Box>
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '250px',
    my: '10px',
    overflowY: 'scroll',
    // border: '1px solid red',
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      mb: '10px',
      // border: '1px solid red',
    }}
  >
    <Typography variant='h4'>Reviews:</Typography>
  </Box>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // border: '1px solid red',
    }}
  >
    Nothing to show here
  </Box>
</Box></>;
};

export default DoctorProfile