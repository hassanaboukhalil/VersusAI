import { io } from 'socket.io-client';

const socket = io('http://16.171.31.119:4000'); // this is the socket server
// const socket = io(process.env.SOCKET_SERVER_URL_STAGING!); // this is the socket server

export default socket;
