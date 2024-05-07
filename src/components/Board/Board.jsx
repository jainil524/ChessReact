import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';

import AvailableMove from '../../Logic/PieceMove';

import '../../css/Board.css';

function Board() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [destination, setDestination] = useState(null);
  const [gameState, setGameState] = useState(0); // ['white', 'black']
  const [IsgamePiecesPlaced, setIsGamePiecesPlaced] = useState(false); // [true, false]

  // Define your pieces here
  let pieces = [
    { piece: "1_elephant", Image: '../../../public/Pieces/1_Elephant.svg', position: 'a8' },
    { piece: "1_cemal", Image: '../../../public/Pieces/1_Cemal.svg', position: 'b8' },
    { piece: "1_horse", Image: '../../../public/Pieces/1_Horse.svg', position: 'c8' },
    { piece: "1_king", Image: '../../../public/Pieces/1_King.svg', position: 'd8' },
    { piece: "1_queen", Image: '../../../public/Pieces/1_Queen.svg', position: 'e8' },
    { piece: "1_horse", Image: '../../../public/Pieces/1_Horse.svg', position: 'f8' },
    { piece: "1_cemal", Image: '../../../public/Pieces/1_Cemal.svg', position: 'g8' },
    { piece: "1_elephant", Image: '../../../public/Pieces/1_Elephant.svg', position: 'h8' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'a7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'b7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'c7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'd7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'e7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'f7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'g7' },
    { piece: "1_pawn", Image: '../../../public/Pieces/1_Pawn.svg', position: 'h7' },
    { piece: "0_elephant", Image: '../../../public/Pieces/0_Elephant.svg', position: 'a1' },
    { piece: "0_cemal", Image: '../../../public/Pieces/0_Cemal.svg', position: 'b1' },
    { piece: "0_horse", Image: '../../../public/Pieces/0_Horse.svg', position: 'c1' },
    { piece: "0_king", Image: '../../../public/Pieces/0_King.svg', position: 'd1' },
    { piece: "0_queen", Image: '../../../public/Pieces/0_Queen.svg', position: 'e1' },
    { piece: "0_horse", Image: '../../../public/Pieces/0_Horse.svg', position: 'f1' },
    { piece: "0_cemal", Image: '../../../public/Pieces/0_Cemal.svg', position: 'g1' },
    { piece: "0_elephant", Image: '../../../public/Pieces/0_Elephant.svg', position: 'h1' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'a2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'b2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'c2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'd2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'e2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'f2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'g2' },
    { piece: "0_pawn", Image: '../../../public/Pieces/0_Pawn.svg', position: 'h2' },
  ];

  const isCheck = (dest) => {
    console.log(dest);
    AvailableMove(dest);
    if(document.querySelector(`.Cell img.canattack[alt='${gameState}_king']`) !== null) {
      alert("Check");
    }
  }

  // Place pieces on the board when the component mounts
  useEffect(() => {
    // place pieces on the board
    pieces.forEach((piece) => {
      const cell = document.querySelector(`.Cell[data-loc="${piece.position}"]`);
      cell.innerHTML = `<img src=${piece.Image} alt=${piece.piece} />`;
    });

    setIsGamePiecesPlaced(true);
  }, []);

  // Handle the move of the piece from the selected cell to the destination cell
  const handleMove = (selectedPiece, destination) => {

    // if the destination cell is not a valid cell to place the piece, return
    if (destination?.classList.contains("canplace") == false) {
      selectedPiece?.querySelector("img").classList.remove('selected');
      setSelectedPiece(null);
      setDestination(null);
      return;
    }


    if (destination !== null) {
      setTimeout(() => {
        if (destination.childElementCount > 0 && destination.querySelector("img").getAttribute("alt").split("_")[0] != gameState) {

          destination.querySelector("img").remove();
          console.log("Piece Captured", destination, selectedPiece, destination.querySelector("img"));

        }
        destination.appendChild(selectedPiece.querySelector("img"));
      }, 0);
      selectedPiece.querySelector("img").classList.remove('selected');

    }

    isCheck(destination);

    if (selectedPiece !== null && destination !== null) {
      setSelectedPiece(null);
      setDestination(null);
      setGameState(gameState === 0 ? 1 : 0)
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace'));

    }
  }

  // call the handleMove function when the selectedPiece or destination changes
  useEffect(() => {

    // if the turn is not of the selected piece, return
    if (selectedPiece !== null && gameState != selectedPiece?.querySelector("img").getAttribute("alt").split("_")[0]) {
      console.log("Not your turn");
      return;
    }

    if (selectedPiece !== null && destination === null) {
      selectedPiece?.querySelector("img").classList.add('selected');
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace'));

      AvailableMove(selectedPiece);

    }

    if (selectedPiece !== null && destination !== null) {
      handleMove(selectedPiece, destination);
    }

  }, [selectedPiece, destination, gameState]);

  // Render the board
  return (
    <div className='Board'>

      {
        ["8", "7", "6", "5", "4", "3", "2", "1"].map((row) => {
          return (
            <div className='Row' key={row} data-loc={row}>
              {
                ["a", "b", "c", "d", "e", "f", "g", "h"].map((col) => {
                  return (
                    <Cell key={col + row} loc={col + row} gameState={gameState} setDestinationCell={setDestination} setSelectedPiece={setSelectedPiece} />
                  );
                })
              }
            </div>
          );
        })
      }

    </div>
  );
}

export default Board;
