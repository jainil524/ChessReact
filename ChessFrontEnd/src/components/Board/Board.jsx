import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import { Move, io } from '../../Logic/StartGame.js'

import AvailableMove from '../../Logic/PieceMove';
import pieces, { makePiece } from "../../utils/Piece.js";

import '../../css/Board.css';

function Board() {
  let player = window.localStorage.getItem('player');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [destination, setDestination] = useState(null);
  const [gameState, setGameState] = useState(0); // ['white', 'black']
  const [IsgamePiecesPlaced, setIsGamePiecesPlaced] = useState(false); // [true, false]

  const isCheck = (dest) => {
    AvailableMove(dest);
    let king = document.querySelector(`.Cell.canattack img[alt='${gameState == 1 ? 0 : 1}_king']`);
    if (king !== null) {
      alert("Check");
      king.parentElement.classList.add("Checked");
    } else {
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace'));
      document.querySelector(".Checked")?.classList.remove("Checked");
    }
  }

  // Get the move from the other player
  useEffect(() => {
    const getMoves = (userID, move, player, performMove) => {
      if (userID !== window.localStorage.getItem('userId')) {
        performMove(move);
        io.emit('move-ack');
        setGameState(gameState === 0 ? 1 : 0);
      }
    }

    const handleGetMove = (userID, move, player) => {
      console.log('Get move', move);
      getMoves(userID, move, player, performMove);
    }

    io.on('getmove', handleGetMove);

    // Cleanup function to remove the event listener
    return () => {
      io.off('getmove', handleGetMove);
    };
  }, [gameState]);

  // Place pieces on the board when the component mounts
  useEffect(() => {
    // place pieces on the board
    pieces.forEach((piece) => {
      const cell = document.querySelector(`.Cell[data-loc="${piece.position}"]`);
      cell.innerHTML = makePiece(piece);
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

        }
        destination.appendChild(selectedPiece.querySelector("img"));

        isCheck(destination);

      }, 0);
      selectedPiece.querySelector("img").classList.remove('selected');

    }


    if (selectedPiece !== null && destination !== null) {
      setSelectedPiece(null);
      setDestination(null);
      setGameState(gameState === 0 ? 1 : 0)
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace', 'canattack'));

    }
  }

  // call the handleMove function when the selectedPiece or destination changes
  useEffect(() => {

    // prevent piece until its not your turn
    if (player != gameState) {
      return;
    }

    // if the turn is not of the selected piece, return
    if (selectedPiece !== null && gameState != selectedPiece?.querySelector("img")?.getAttribute("alt").split("_")[0]) {
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
      let move = {
        from: selectedPiece.getAttribute("data-loc"),
        to: destination.getAttribute("data-loc"),
        piece: selectedPiece.querySelector("img").getAttribute("alt"),
        gameState: gameState
      };

      let roomID = window.localStorage.getItem('roomId');
      let userID = window.localStorage.getItem('userId');

      Move(roomID, userID, move);

    }

  }, [selectedPiece, destination, gameState]);

  function performMove(move) {
    let from = document.querySelector(`.Cell[data-loc="${move.from}"]`);
    let to = document.querySelector(`.Cell[data-loc="${move.to}"]`);

    setTimeout(() => {
      if (to.childElementCount > 0 && to.querySelector("img").getAttribute("alt").split("_")[0] != gameState) {

        to.querySelector("img").remove();

      }
      to.appendChild(from.querySelector("img"));
      console.log("Debug the erorr", from, to);
      // isCheck(to);

    }, 0);
  }

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
