import { io } from 'socket.io-client';

// const socket = io('/:4000'); // this is the socket server
const socket = io(process.env.SOCKET_SERVER_URL_PRODUCTION! || 'http://localhost:4000'); // this is the socket server

// const origin = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
// const socket = io(`http://${origin}:4000`);

export default socket;
