import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import routes from './routes/index.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(bodyParser.json());

app.use('/api', routes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL, // Adjust as needed for security
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        console.log(`Socket ${socket.id} joined game ${gameId}`);
    });

    socket.on("helloServer", (data) => {
        console.log(data);
        socket.emit("helloClient", "Hello from server");
    });

    socket.on('makeMove', (data) => {
        const { gameId, move } = data;
        console.log(`Move made in game ${gameId}:`, move);
        // Broadcast the move to all other clients in the game room
        socket.to(gameId).emit('moveMade', move);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(process.env.SOCKET_PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${process.env.SOCKET_PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});

