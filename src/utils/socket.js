
import io from 'socket.io-client';
export const socket = io(process.env.REACT_APP_API_BASE_URL, { autoConnect: false });


socket.onAny((event, ...args) => {
    console.log(event, args);
  });