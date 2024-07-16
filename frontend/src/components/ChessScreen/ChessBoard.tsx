import React from 'react';
import BoardUI from './BoardUI';
import Player from './Player';


import "../../../public/css/ChessBoard.css"

const ChessBoard = ({ socket }: any) => {

    let PlayerInfo = {
        name: "Jainil Prajapati",
        score: 23,
        moves:[
            "e4","e5","g3"
        ]
    }

    {

        return (

            <div className="board-container">
                <Player pinfo={PlayerInfo}/>
                <BoardUI />
                <Player isOwner={true} pinfo={PlayerInfo}/>
            </div>
        )
    }
};

export default ChessBoard;
