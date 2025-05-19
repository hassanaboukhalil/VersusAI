import { io } from 'socket.io-client';

const socket = io('http://13.38.78.117:4000'); // this is the socket server
// const socket = io(process.env.SOCKET_SERVER_URL_STAGING!); // this is the socket server

export default socket;
