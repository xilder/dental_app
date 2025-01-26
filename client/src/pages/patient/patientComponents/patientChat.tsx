import { useEffect, useState, FC } from 'react';
import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '../../../interfaces/message';
import { Socket } from 'socket.io-client';
import moment from 'moment';
import UserData from '../../../interfaces/userData';
import PatientChatCard from './patientChatComponents/patientChatCard';
import ChatDisplay from './patientChatComponents/chatDisplay';

const PatientChat: FC<{ client: Socket; user: UserData }> = ({
  client,
  user,
}) => {
  const [newMessage, setNewMessage] = useState('');
  // const [messages, setMessages] = useState<ChatMessageArray>(chatFormat);
  const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>(
    {}
  );
  const [users, setUsers] = useState<string[]>(['']);
  const [receiverID, setReceiverID] = useState('');

  client.on('users', (data: string[]) => {
    setUsers([...data]);
  });

  // client.on(
  //   'message',
  //   (data: {
  //     id: string;
  //     text: string;
  //     sender_id: string;
  //     receiver_id: string;
  //     created_at: string;
  //   }) => {
  //     const date = moment(data.created_at, 'HH:mm:ss dddd - MMMM D, YYYY');
  //     const messageObj = { ...data, created_at: date };
  //     setMessages((prev) => ({
  //       ...prev,
  //       [data.sender_id]: [...(prev[data.sender_id] || []), messageObj],
  //     }));
  //   }
  // );

  // client.on(
  //   'offline_message',
  //   (data: { sender_id: string; text: string; created_at: string }) => {
  //     const sender_id = data.sender_id;
  //     const senderHistory = messages[sender_id];
  //     senderHistory.push({ ...data, receiver_id: 'me' });
  //     setMessages((prevMessages) => ({ ...prevMessages, senderHistory }));
  //   }
  // );

  // const getChatHistory
  //  = async () => {
  //   const messageHistory: ChatMessageArray = await axios.get(
  //     '/api/v1/chat/history'
  //   );
  //   setMessages((prevMessage) => ({ ...prevMessage, ...messageHistory }));
  // };

  const handleSendMessage = (id: string) => {
    if (newMessage.trim() !== '') {
      try {
        const data = {
          receiver_id: id,
          text: newMessage,
        };
        client.emit('send_message', data);
        setNewMessage('');
      } catch {
        setNewMessage(newMessage);
      }
    }
  };
  const [a, setA] = useState(0)


  useEffect(() => {
    // getChatHistory();
    client.on('receive_message', (data: ChatMessage) => {
      setA(prev => prev + 1)
      console.log(data);
      console.log(a);
    });
  }, [client, a]);

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
        {/* <ChatDisplay id={receiverID} messages={messages[receiverID]} /> */}
        <Box sx={{ flex: 1, border: '1px solid red', width: '100%' }}></Box>
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
          <IconButton onClick={() => handleSendMessage(receiverID)}>
            <SendIcon />
          </IconButton>
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
        {users.length > 0 ?
          users.map((user_id) => {
            if (user_id !== user.id) {
              return (
                <Box
                  key={user_id}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    console.log(user_id);
                    setReceiverID(user_id);
                  }}
                >
                  <PatientChatCard id={user_id} />
                </Box>
              );
            }
            return null;
          }) : (<>
          <Typography>Begin chats on the profile screen to see chats here</Typography>
          </>)}
      </Box>
      <Button
        onClick={() => client.emit('users', 'online')}
        sx={{ position: 'absolute', right: '10px', bottom: '10px' }}
      >
        Load Users
      </Button>
    </Box>
  );
};

export default PatientChat;
