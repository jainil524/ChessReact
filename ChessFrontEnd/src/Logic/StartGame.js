import socketIOClient from 'socket.io-client';



const envWeAreIn = import.meta.env.VITE_ENV;
// let socketURL = "https://chess-react-backend.vercel.app";
// let socketURL = "http://192.168.190.166:3000";
let socketURL = "http://localhost:3000";


// Establish WebSocket connection
const io = socketIOClient(socketURL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    forceNew: true,
    reconnectionAttempts: 3,
    timeout: 2000,
});

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

const CreateRoom = (userID, username) => {
    io.emit('create-room', userID, username);
    io.on('room-created', (roomId) => {
        console.log('Room created', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 0);
        return true;
    });
};

const JoinRoom = (roomId, userID, username) => {
    io.emit('join-room', roomId, userID, username);

    io.on('joined-room', (roomId) => {
        console.log('Joined room', roomId);
        window.localStorage.setItem('roomId', roomId);
        window.localStorage.setItem("player", 1);
        return true;
    });

    io.on('room-full', () => {
        console.log('Room full');
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
