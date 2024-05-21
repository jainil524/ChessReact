import socketIOClient from 'socket.io-client';
// import dotenv from "dotenv";

// dotenv.config();
// 
// process.env.NODE_ENV = 'development';
// Access environment variables after they have been loaded
const socketURL = import.meta.env.VITE_SOCKET_URL;

// Establish WebSocket connection
const io = socketIOClient(socketURL);

// Event listeners for socket events
io.on('connect', () => {
    console.log('Connected to server');
});

io.on('user-connected', (userId) => {
    window.localStorage.setItem('userId', userId);
});

io.on('disconnected', () => {
    console.log('Disconnected from server');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('roomId');
    window.localStorage.removeItem('player');
});

const FetchAllRooms = (setRooms) => {
    io.emit('get-all-rooms');
    io.once('all-rooms', (rooms) => {
        console.log(rooms);
        setRooms(rooms);
    });
};

const CreateRoom = (userID) => {
    io.emit('create-room', userID);
    io.on('room-created', (roomId) => {
        console.log('Room created', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 0);
        return true;
    });
};

const JoinRoom = (roomId, userID) => {
    io.emit('join-room', roomId, userID);

    io.on('joined-room', (roomId) => {
        console.log('Joined room', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 1);
        return true;
    });

    io.on('room-not-found', () => {
        console.log('Room not found');
        return true;
    });
};

const Move = (roomID, userID, move) => {
    io.emit('domove', roomID, userID, move);
    console.log('Move', move);
};

export { FetchAllRooms, CreateRoom, JoinRoom, Move, io };
