import React, { useState } from 'react';
import { socket } from '../utils/socket';

const GameControls = () => {
    const [gameId, setGameId] = useState('');

    const handleJoinGame = () => {
        socket.emit('joinGame', gameId);
    };

    const handleMakeMove = (move: any) => {
        socket.emit('makeMove', { gameId, move });
    };

    return (
        <div>
            <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                placeholder="Enter Game ID"
            />
            <button onClick={handleJoinGame}>Join Game</button>
            {/* Other game control buttons */}
        </div>
    );
};

export default GameControls;
