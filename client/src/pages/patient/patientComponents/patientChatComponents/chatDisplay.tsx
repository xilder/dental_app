import React, { FC, useEffect, useState } from 'react';
import { ChatMessage } from '../../../../interfaces/message';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import theme from '../../../../theme/theme';
import axiosClient from '../../../../axiosClient/axiosClient';

const ChatDisplay: FC<{ messages: ChatMessage[]; id: string }> = ({
  messages,
  id,
}) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const getFullName = async () => {
      try {
        const response = await axiosClient.get(
          `/api/v1/resources/get_name/${id}`
        );
        const { name } = await response.data;
        setFullName(name);
      } catch (e) {
        console.log(e);
        setFullName('');
      }
    };
    getFullName();
  }, [id]);
  return (
    <>
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          mx: '',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <CardMedia
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid black',
            m: '5px',
          }}
          src='https://api.dicebear.com/9.x/adventurer/svg'
        />
        <CardContent>
          <Typography variant='h6'>Name</Typography>
        </CardContent>
      </Card>
      <List sx={{ flexGrow: 1, overflowY: 'scroll', width: '100%' }}>
        {messages.map((message) => {
          const time = message.created_at.format('HH:mm dddd - MMMM D, YYYY');
          return (
            <ListItem
              key={message.id}
              sx={{
                alignSelf: message.sender_id === id ? 'flex-start' : 'flex-end',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography>{fullName}</Typography>
              <ListItemText primary={message.text} secondary={time} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ChatDisplay;
