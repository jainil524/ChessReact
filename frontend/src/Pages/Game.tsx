import React, { useEffect } from 'react';
import { socket } from '../utils/socket';
import ChessBoard from '../components/ChessScreen/ChessBoard';

const Game = () => {

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('moveMade', (move) => {
            // Update board state with new move
            console.log('Move received:', move);
        }); 

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleMove = (move: any) => {
        socket.emit('makeMove', { gameId: 'gameId', move });
    };

    return (
        <div>
            <ChessBoard onMove={handleMove} socket={socket} />
        </div>
    );
};

export default Game;
