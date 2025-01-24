// import { io, Socket } from 'socket.io-client';
// import { Box, Button } from '@mui/material';
// import { Container } from '@mui/system';
// import { useEffect, useRef, useState } from 'react';

// const VideoComponent = () => {
//   // const [isInitiator, setIsInitiator] = useState(false);`
//   const localVideo = useRef<HTMLVideoElement>(null);
//   const remoteVideo = useRef<HTMLVideoElement>(null);
//   let localStream = useRef<MediaStream | null>(null);
//   const [isInitiator, setIsInitiator] = useState(false);
//   const configuration: RTCConfiguration = {
//     'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }],
//   };
//   const peerConnection = new RTCPeerConnection(configuration);
//   const client = io('localhost:5000/peer');
//   client.on('connectid', (id) => {
//     console.log(id);
//   });

//   const handleStreams = async () => {
//     try {
//       const constraints: MediaStreamConstraints = {
//         video: true,
//         audio: true,
//       };
//       localStream.current = await navigator.mediaDevices.getUserMedia(
//         constraints
//       );
//       if (localVideo.current && localStream.current) {
//         console.log('done');
//         localVideo.current.srcObject = localStream.current;
//       }
//     } catch {
//       console.log('error');
//     }
//   };

//   const handleCall = async () => {
//     console.log(isInitiator);
//     const offer = await peerConnection.createOffer();
//     peerConnection.setLocalDescription(offer);
//     client.emit('offer', offer);
//     console.log('make call');
//   };

//   const handleOffer = async (offer: RTCSessionDescriptionInit) => {
//     const remoteDesc = new RTCSessionDescription(offer);
//     await peerConnection.setRemoteDescription(remoteDesc);
//     const answer = peerConnection.createAnswer();
//     client.emit('answer', answer);
//     console.log(offer);
//     console.log('handle offer');
//   };

//   // const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
//   //   const remoteDesc = new RTCSessionDescription(answer);
//   //   await peerConnection.setRemoteDescription(remoteDesc);
//   //   console.log('handle answer');
//   // };

//   handleStreams();

//   useEffect(() => {
//     client.on('offer', (offer) => {
//       if (!isInitiator) handleOffer(offer);
//     });
//   }, []);
//   // client.on('answer', handleAnswer);

//   return (
//     <Container
//       sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//     >
//       <Container>
//         <Box
//           sx={{
//             width: '100%',
//             height: '100',
//             flex: 1,
//             border: '1px red solid',
//           }}
//         >
//           <video autoPlay playsInline muted ref={localVideo} />
//         </Box>
//         <Button
//           variant='contained'
//           onClick={() => {
//             setIsInitiator(true);
//             if (isInitiator) handleCall();
//           }}
//         >
//           Start Call
//         </Button>
//       </Container>
//       <Container>
//         <Box
//           sx={{
//             width: '100%',
//             height: '100%',
//             flex: 1,
//             border: '1px red solid',
//           }}
//         >
//           <video autoPlay playsInline muted ref={remoteVideo} />
//         </Box>
//       </Container>
//     </Container>
//   );
// };

// export default VideoComponent;
