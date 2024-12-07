import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  useTheme,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { io, Socket } from 'socket.io-client';

interface Message {
  sender: string;
  message: string;
}

const ChatUI: React.FC<{
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const client = io('http://localhost:5000/', {
      transports: ['websocket'],
    });
    // client.connect();
    client.on('connect', () => {
      console.log('Connected using:', client);
    });
    client.on('message', (message: Message) => {
      // console.log('message received')
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    setSocket(client);
    return () => {
      client.off('message'); // Remove the message event listener
      client.disconnect(); // Disconnect from the server
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      try {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { sender: 'Anonymous', message: newMessage },
        // ]);
        socket?.emit('message', { sender: 'Anonymous', message: newMessage });
        setNewMessage('');
      } catch {
        setNewMessage(newMessage);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '300px',
        border: '2px solid #005969',
        borderRadius: '5px',
        backgroundColor: '#F5F5F5DD',
        width: '300px',
        position: 'fixed',
        bottom: '20px',
        right: '5px',
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: '2px',
          px: '5px',
          backgroundColor: theme.palette.primary.light,
          // border: '1px solid black'
        }}
      >
        <Typography sx={{fontSize: '12px'}}>ASK GLORY</Typography>
        <IconButton
          onClick={() => setShowChat(false)}
          sx={{ borderRadius: '50%' }}
        >
          <CloseIcon
            sx={{
              color: theme.palette.error.dark,
            }}
          />
        </IconButton>
      </Container>
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
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
              primary={message.sender}
              secondary={message.message}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type your message...'
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatUI;
