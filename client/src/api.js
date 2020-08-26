import socketIOClient from 'socket.io-client';
import { socket } from './service/socket';

//const socket = openSocket('http://localhost:5000');
//const socket = socketIOClient('http://localhost:5000');

function subscribeToSocket(callback) {
  socket.emit('subscribe');
  socket.on('dupajasia', (param1, param2) => {
    //console.log(param1);
    //console.log(param2);
    //console.log(Date.now() - param2.id);
    //callback(timestamp)
  });
}

export { subscribeToSocket };
