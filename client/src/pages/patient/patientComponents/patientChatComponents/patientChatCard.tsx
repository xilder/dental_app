import React, { FC, useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axiosClient from '../../../../axiosClient/axiosClient';

const PatientChatCard: FC<{ id: string | null }> = ({ id }) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const getFullName = async () => {
      try {
        const response = await axiosClient.get(
          `/api/v1/resources/full_name/${id}`
        );
        const name = await response.data;
        setFullName(name);
      } catch (e) {
        setFullName('');
      }
    };
    if (id) getFullName();
  });
  return (
    <>
      {fullName && (
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            height: 'auto',
            // border: '1px solid red',
          }}
        >
          <CardMedia
            sx={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
            }}
            src={`https://api.dicebear.com/9.x/adventurer/svg&seed=${
              fullName.split(' ')[1]
            }`}
          />
          <CardContent>
            <Typography>{fullName}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PatientChatCard;
