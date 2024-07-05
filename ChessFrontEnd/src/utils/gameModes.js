// src/utils/gameModes.js

const initializePlayerVsPlayerOffline = (navigate) => {
    // Logic for initializing player vs. player offline mode
    window.localStorage.setItem('player', 0);
    navigate('/board');
};

const initializePlayerVsPlayerOnline = (userID, userName, roomId, navigate, createRoom, joinRoom) => {
    // Logic for initializing player vs. player online mode
    if (roomId) {
        joinRoom(roomId, userID, userName, () => {
            navigate('/board');
        });
    } else {
        createRoom(userID, userName, () => {
            navigate('/board');
        });
    }
};

const initializePlayerVsAI = (navigate) => {
    // Logic for initializing player vs. AI mode
    window.localStorage.setItem('player', 0);
    navigate('/board');
};

export { initializePlayerVsPlayerOffline, initializePlayerVsPlayerOnline, initializePlayerVsAI };
