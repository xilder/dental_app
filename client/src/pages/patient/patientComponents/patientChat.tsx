import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatMessageArray, {
  chatFormat,
  ChatMessage,
} from '../../../interfaces/message';
import theme from '../../../theme/theme';
import { io } from 'socket.io-client';
import axios from 'axios';

const PatientChat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageArray>(chatFormat);
  const client = io('http://localhost:5000/', {
    transports: ['websocket'],
  });
  client.on('connect', () => {
    console.log('Connected using:', client);
  });
  client.on(
    'offline_message',
    (data: { sender_id: string; text: string; created_at: string }) => {
      const sender_id = data.sender_id;
      const senderHistory = messages[sender_id];
      senderHistory.push({ ...data, receiver_id: 'me' });
      setMessages((prevMessages) => ({ ...prevMessages, senderHistory }));
    }
  );

  const getChatHistory = async () => {
    const messageHistory: ChatMessageArray = await axios.get(
      '/api/v1/chat/history'
    );
    setMessages((prevMessage) => ({ ...prevMessage, ...messageHistory }));
  };

  const handleSendMessage = (receiver: string, sender: string) => {
    if (newMessage.trim() !== '') {
      try {
        client.emit('message', {
          sender_id: sender,
          receiver_id: receiver,
          text: newMessage,
        });
        setNewMessage('');
      } catch {
        setNewMessage(newMessage);
      }
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '10px, solid red',
        height: '100%',
        flexDirection: 'row',
        mt: '10px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          //   border: '10px, solid red',
          height: '100%',
        }}
      >
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
          ></CardMedia>
          <CardContent>
            <Typography variant='h6'>Name</Typography>
          </CardContent>
        </Card>
        <List sx={{ flexGrow: 1, overflowY: 'scroll', width: '100%' }}>
          {Object.entries(messages).map(([receiver, messages]) => (
            <ListItem
              key={receiver}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // border: '1px solid black',
              }}
            >
              <ListItemText
                sx={{ flex: 1 }}
                primary={receiver}
                secondary={messages[messages.length - 1].text}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ p: 1, display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            multiline={true}
          />
          {/* <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
          width: '300px',
          height: '100%',
          // border: '1px solid red',
          mx: '5px',
          overflowY: 'scroll',
          borderLeft: '2px solid black',
        }}
      >
        <Card sx={{ display: 'flex', width: '100%' }}>
          <CardMedia
            sx={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              // border: '1px solid red',
            }}
          ></CardMedia>
          <CardContent>
            <Typography>Name</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientChat;
