const { log } = require('console');
const express = require('express');
const cors = require('cors');


const app = express();


const { v4: uuidv4 } = require('uuid');
// const dbConnect = require('./DBConnect');
const server = require('http').Server(app);

app.use(cors());

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

const users = {
};

const rooms = {
}

/**
 * @param {import('socket.io').Socket} socket
 */
io.on('connection', socket => {
    // dbConnect();
    console.log("Connected", socket.id);
    let userid = uuidv4();
    users[userid] = { 
        id: userid ,
        name: "User " + (Object.keys(users).length + 1),
        player: 0
    };
    socket.emit('user-connected', userid);

    socket.on("get-all-rooms", () => {
        let availableRooms = Object.entries(rooms)
            .filter(([roomId, room]) => Object.keys(room.users).length < 2)
            .map(([roomId, room]) => ({ roomId, users: room.users }));
        
        socket.emit('all-rooms', availableRooms);
        
    });

    socket.on("create-room", (userID) => {
        let roomId = Math.random().toString(36).substring(7);

        rooms[roomId] = { users: {} , player: 0};
        rooms[roomId].users[userID] = users[userID];

        socket.emit('room-created', roomId);
        socket.join(roomId);

        console.log("Current room", socket.rooms);
    });

    socket.on("join-room", (roomId, userID) => {
        if (!rooms[roomId]) {
            socket.emit('room-not-found');
            return;
        }
    
        rooms[roomId].users[userID] = users[userID];
        users[userID].player = 1;
    
        // Emit event to notify other users in the room
        socket.to(roomId).emit('user-joined', userID);
    
        // Emit event to the joining user
        socket.emit('joined-room', roomId);
    
        // Join the room
        socket.join(roomId);
    
        console.log("Current room", socket.rooms);
    });

    socket.on("domove", (roomID, userID ,move) => {
        socket.to(roomID).emit("getmove", userID, move, rooms[roomID].player);
        console.log("Move", move, userID, rooms[roomID].player, socket.rooms);
    });

    socket.on('disconnect', (roomID, userID) => {
        socket.emit("disconnected")
        delete users[userID];
        if(rooms[roomID] !== undefined && rooms[roomID].users.length === 0){
            delete rooms[roomID];
        }
    });
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
