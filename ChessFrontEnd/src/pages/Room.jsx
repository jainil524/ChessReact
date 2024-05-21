import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateRoom, JoinRoom } from '../Logic/StartGame';
import '../css/createorjoinroom.css';

const Room = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        // Logic to create a room
        console.log('Creating room');
        let userID = window.localStorage.getItem('userId');
        CreateRoom(userID);
        navigate('/board')

    };

    const handleJoinRoom = () => {
        // Logic to join a room
        if (roomId.trim()) {
            console.log(`Joining room with ID: ${roomId}`);
            let userID = window.localStorage.getItem('userId');
            JoinRoom(roomId, userID);
            navigate('/board');
        }
    };

    const handleInputChange = (event) => {
        setRoomId(event.target.value);
    };

    return (
        <div className="create-join-room">
            <h1>Chess Game</h1>
            <div className="create-room">
                <h2>Create a New Room</h2>
                <button className="create-button" onClick={handleCreateRoom}>Create Room</button>
            </div>
            <div className="join-room">
                <h2>Join an Existing Room</h2>
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={handleInputChange}
                    className="room-input"
                />
                <button className="join-button" onClick={handleJoinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default Room;
