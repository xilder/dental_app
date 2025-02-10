import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { ChatMessage } from '../../../../interfaces/message';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  // ListItemText,
  Box,
} from '@mui/material';
import axiosClient from '../../../../axiosClient/axiosClient';
import { useAppSelector } from '../../../../hooks/storeHooks';
// import { useAppSelector } from '../../../../hooks/storeHooks';

const ChatDisplay: FC<{ messages: ChatMessage[]; chateeID: string }> = ({
  messages,
  chateeID,
}) => {
  const user = useAppSelector((store) => store.user);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const getFullName = async () => {
      try {
        const response = await axiosClient.get(
          `/api/v1/resources/full_name/${chateeID}`
        );
        const name = await response.data;
        // console.log(name);
        setFullName(name);
      } catch (e) {
        console.log(e);
        setFullName('');
      }
    };
    getFullName();
  }, [chateeID]);
  return (
    <>
      {chateeID ? (
        <>
          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                height: 'fit-content',
                // mx: '',
                backgroundColor: 'primary.light',
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
                image={`https://api.dicebear.com/9.x/adventurer/svg?seed=${
                  fullName.split(' ')[1]
                }`}
              />
              <CardContent>
                <Typography variant='h4'>{fullName}</Typography>
              </CardContent>
            </Card>
          </Box>
          <List
            sx={{
              flexGrow: 1,
              overflowY: 'scroll',
              width: '100%',
              border: '1px solid red'
              //   display: 'flex',
              //   alignItems: 'center',
              //   flexDirection: 'column',
              //   justifyContent: 'center',
            }}
          >
            {messages &&
              messages.map((message) => {
                const time = moment(message.created_at).format(
                  'MMMM Do YYYY, h:mm a'
                );
                return (
                  <ListItem
                    disablePadding
                    key={message.id}
                    sx={{
                      alignItems:
                        message.sender_id === chateeID
                          ? 'flex-start'
                          : 'flex-end',
                      display: 'flex',
                      flexDirection: 'column',
                      // border: '1px solid green',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // width: '60%',
                        mt: '5px',
                      }}
                    >
                      <Typography variant='h6'>
                        {message.sender_id === user.id ? 'You' : fullName}
                      </Typography>
                      <Typography>{message.text}</Typography>
                      <Typography variant='body2'>{time}</Typography>
                    </Box>
                    {/* <ListItemText primary={message.text} secondary={time} /> */}
                    {/* <Typography variant='body2'>{`Sender: ${message.sender_id}\nReceiver: ${message.receiver_id}\nUser: ${user.id}`}</Typography> */}
                  </ListItem>
                );
              })}
          </List>
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography component='h6' variant='h6'>
            Select a chat to begin
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatDisplay;
