import React, { useEffect } from 'react';
import Board, { Player } from '../Classes/Board';
import boardStateParser from '../utils/BoardStateParser';

import "../../public/css/ChessBoard.css"

const ChessBoard = ({ socket, onMove }: any) => {
    // Render chess board and handle move events
    const [board, setBoard] = React.useState<Board>();

    useEffect(() => {
        const b = new Board([new Player("jainil")]);
        setBoard(b);
    }, []);

    {
        return (
            board && (

                <div className="board-container">
                    <div className="player-container">

                    </div>
                    <div className="board">
                        {boardStateParser(board.state).map((row: any, i: number) => (
                            <div className="row" key={i}>
                                {row.map((cell: any, j: number) => (
                                    <div className="cell" key={j}>
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                    <div className="player-container owner">

                    </div>
                </div>
            )
        );
    }
};

export default ChessBoard;
