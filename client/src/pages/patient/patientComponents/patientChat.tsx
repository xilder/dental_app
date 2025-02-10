import {
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  FC,
} from 'react';
import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '../../../interfaces/message';
import { useAppSelector } from '../../../hooks/storeHooks';
import PatientChatCard from './patientChatComponents/patientChatCard';
import ChatDisplay from './patientChatComponents/chatDisplay';
import { ClientContext, MessagesContext } from '../patientContext';
import moment from 'moment';
// import axiosClient from '../../../axiosClient/axiosClient';

const PatientChat: FC<{
  receiverID: string;
  setReceiverID: Dispatch<SetStateAction<string>>;
}> = ({ receiverID, setReceiverID }) => {
  const user = useAppSelector((store) => store.user);
  const client = useContext(ClientContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [newMessage, setNewMessage] = useState('');

  const message2Obj = (receiver: string, text: string) => ({
    receiver_id: receiver,
    created_at: moment().toISOString(),
    text,
  });
  console.log(receiverID);

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

  const handleSendMessage = () => {
    if (!receiverID) return
    if (newMessage.trim() !== '') {
      try {
        const data = message2Obj(receiverID, newMessage)
        client.emit('send_message', data);
        const messagesList = messages ? [...messages[receiverID]] : [];
        messagesList.push({...data, sender_id: user.id ? user.id : '',
        });
        setNewMessage('');
        setMessages((prev) => ({ ...prev, [receiverID]: messagesList }));
      } catch {
        setNewMessage(newMessage);
      }
    }
  };

  const handleReceivedMessage = (data: ChatMessage) => {
    const messagesList = messages[data.sender_id]
    messagesList.push(data)
    setMessages((prev) => ({ ...prev, [data.sender_id]: messagesList }));
  }

  useEffect(() => {
    client.on('receive_message', (data: ChatMessage) => handleReceivedMessage(data));
    return () => {
      client.disconnect();
    };
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '10px, solid red',
        maxHeight: '100%',
        flexDirection: 'row',
        pt: '10px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // border: '10px, solid red',
          height: '500px',
        }}
      >
        <ChatDisplay
          chateeID={receiverID}
          messages={messages ? messages[receiverID] : []}
        />
        {/* <Box sx={{ flex: 1, border: '1px solid red', width: '100%' }} /> */}
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mb: '10px',
          }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            multiline={true}
          />
          <IconButton onClick={() => handleSendMessage()}>
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
        {messages && Object.keys(messages).length >= 1 ? (
          Object.keys(messages).map((receiver_id) => (
            <Box
              key={receiver_id}
              sx={{ width: '100%' }}
              onClick={() => {
                setReceiverID(receiver_id);
                console.log(receiverID);
              }}
            >
              <PatientChatCard id={receiver_id} />
            </Box>
          ))
        ) : (
          <>
            <Typography>
              Begin chats on the profile screen to see chats here
            </Typography>
          </>
        )}
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
