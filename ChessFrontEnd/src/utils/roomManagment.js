// src/utils/roomManagement.js
import { io } from '../Logic/StartGame.js';

const CreateRoom = (userID, username, callback) => {
    io.emit('create-room', userID, username);
    io.on('room-created', (roomId) => {
        console.log('Room created', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 0);
        callback(roomId);
    });
};

const JoinRoom = (roomId, userID, username, callback) => {
    io.emit('join-room', roomId, userID, username);

    io.on('joined-room', (roomId) => {
        console.log('Joined room', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 1);
        callback(roomId);
    });

    io.on('room-full', () => {
        console.log('Room full');
    });

    io.on('room-not-found', () => {
        console.log('Room not found');
    });
};

export { CreateRoom, JoinRoom };
