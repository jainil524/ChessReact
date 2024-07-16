import React from 'react'
import Board, { Player } from '../../Classes/Board.ts';
import { boardStateDecoder } from '../../utils/BoardStateParser.ts';
import { validMoves } from '../../utils/board.logic.ts';

function BoardUI() {
    // Render chess board and handle move events

    const [playerMove, setPlayerMove] = React.useState<number>(1);

    const [board, setBoard] = React.useState<Board>();
    const [boardState, setBoardState] = React.useState<string[][] | null>();
    const [selectedPiece, setSelectedPiece] = React.useState<HTMLElement | null>(null);
    const [destination, setDestination] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        const b = new Board([new Player("jainil")]);
        setBoard(b);

    }, []);

    React.useEffect(() => {
        if (board) {
            setBoardState(boardStateDecoder(board?.state));
        }

    }, [board])

    const handleMove = (from: String, to: String, pieceChar: string) => {

        if (!board) return;
        if (boardState) {
            let moves = validMoves(pieceChar, boardState, playerMove, from);


            if (moves.length !== 0 && moves.filter(move => move.split(":")[1] === to).length !== 0) {
                board?.move(from, to);
                board && setBoardState(boardStateDecoder(board.state));
                setPlayerMove(playerMove === 1 ? 0 : 1);
            }
        }



        board && setBoardState(boardStateDecoder(board.state))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setDestination(e.target as HTMLElement);


    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {


        if (!boardState) return;
        const from = e.target?.closest(".cell")?.getAttribute("data-loc");


        let pieceCharcode = e.target?.alt.charCodeAt(0);

        if ((playerMove !== 0 && pieceCharcode >= 97 && pieceCharcode <= 122) || (playerMove !== 1 && pieceCharcode >= 65 && pieceCharcode <= 90)) {
            alert("Not your turn");
            return;
        }



        let moves = validMoves(e.target.alt, boardState, playerMove, from);

        if (moves.length !== 0) {
            document.querySelector(`[data-loc="${moves[0].split(":")[0]}"]`)?.classList.add("selected");
            moves.forEach(move => {
                document.querySelector(`[data-loc="${move.split(":")[1]}"]`)?.classList.add("canplace");
            })
            setSelectedPiece(e.target as HTMLElement);
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (selectedPiece != null && destination != null) {
            const from = selectedPiece.closest(".cell")?.getAttribute("data-loc")
            const to = destination?.getAttribute("data-loc")



            handleMove(from, to, selectedPiece?.alt);

            if (!boardState) return;

            let moves = validMoves(selectedPiece?.alt, boardState, playerMove, from);

            document.querySelector(`[data-loc="${moves[0].split(":")[0]}"]`)?.classList.remove("selected");
            moves.forEach(move => {
                document.querySelector(`[data-loc="${move.split(":")[1]}"]`)?.classList.remove("canplace");
            })
        }
    }

    return (
        <div className="board">
            {boardState && boardState.map((row: any, i: number) => (
                <div className="row" key={i}>
                    {row.map((cell: any, j: any) => (

                        <div onDragOver={handleDragOver} data-loc={("abcdefgh".charAt(j)) + "" + (8 - i)} onDrop={handleDrop} className="cell" {...((8 - i) - 1 === 0 ? { 'data-labelx': "abcdefgh".charAt(j) } : {})} data-labely={8 - i} key={j} >
                            {
                                Board.covertToPiece(cell)
                                &&
                                <img
                                    data-piece={cell}
                                    draggable={true}
                                    onDragStart={handleDragStart}
                                    src={Board.covertToPiece(cell)}
                                    alt={cell}
                                />
                            }
                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default BoardUI
