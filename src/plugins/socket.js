import { io } from 'socket.io-client';

const socket = io('http://localhost:3200');

export default {
  install: (app) => {
    app.config.globalProperties.$socket = socket;
  }
};