import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('tasksUpdated', (tasks: any) => {
  console.log('Received task update:', tasks);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
