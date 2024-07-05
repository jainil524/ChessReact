import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { FetchAllRooms, JoinRoom } from '../Logic/StartGame';

import '../css/roomlist.css';

const RoomList = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        FetchAllRooms(setRooms);
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const TakeUserName = () => {
        let username = prompt("Please enter your User Name: ");
        window.localStorage.setItem("userName", username);
        return username;
    }

    const handleJoinRoom = (room) => {

        let userName = window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : TakeUserName();
        JoinRoom(room.roomId, window.localStorage.getItem("userId"),userName)
        navigate("/board");
    }

    const filteredRooms = rooms.filter(room => {
        let users = Object.values(room.users);
        let userNames = users.map(user => user.name);
        return userNames.some(name => name.toLowerCase().includes(search.toLowerCase())) || room.roomId.includes(search);
    });

    return (
        <div className="room-list">
            <h1>Available Rooms</h1>
            <input
                type="text"
                placeholder="Search by user name"
                value={search}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul>
                {
                    rooms.length != 0
                        ?
                        filteredRooms.map(room => (
                            <li key={room.roomId} className="room">
                                <h2>Room ID: {room.roomId}</h2>
                                <ul>
                                    {Object.entries(room.users).map(([userId, user]) => (
                                        <li key={userId}>{user.name}</li>
                                    ))}
                                </ul>
                                <button className="join-button" onClick={() => handleJoinRoom(room)}>Join Room</button>
                            </li>
                        ))
                        :
                        <li className="room">
                            <h2>No rooms available <Link to="/rooms">Create one</Link></h2>
                        </li>
                }
            </ul>
        </div>
    );
};

export default RoomList;
