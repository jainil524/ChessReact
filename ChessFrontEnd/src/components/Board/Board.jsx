import React, { useState, useEffect, useCallback } from 'react';

import Cell from '../Cell/Cell';
import { Move, io } from '../../Logic/StartGame.js';
import AvailableMove from '../../Logic/PieceMove';
import pieces, { makePiece } from "../../utils/Piece.js";
import chessMiniMax from '../../utils/MiniMaxForChess.js';

import '../../css/Board.css';

function Board() {
  const player = window.localStorage.getItem('player');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [destination, setDestination] = useState(null);
  const [gameState, setGameState] = useState(0);
  const [isGamePiecesPlaced, setIsGamePiecesPlaced] = useState(false);

  const isCheck = useCallback((dest) => {
    
    AvailableMove(dest);

    const king = document.querySelector(`.Cell.canattack img[alt='${gameState === 1 ? 0 : 1}_king']`);
    
      if (king !== null) {
      king.parentElement.classList.add("Checked");
    } else {
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace'));
      document.querySelector(".Checked")?.classList.remove("Checked");
    }
  }, []);

  useEffect(() => {
    const handleGetMove = (userID, move) => {
      if (userID !== window.localStorage.getItem('userId')) {
        performMove(move);
        io.emit('move-ack');
        setGameState(prevState => prevState === 0 ? 1 : 0);
      }
    };

    io.on('getmove', handleGetMove);

    return () => {
      io.off('getmove', handleGetMove);
    };
  }, []);

  useEffect(() => {
    pieces.forEach((piece) => {
      const cell = document.querySelector(`.Cell[data-loc="${piece.position}"]`);
      cell.innerHTML = makePiece(piece);
    });

    setIsGamePiecesPlaced(true);
  }, []);

  const performMove = useCallback((move) => {
    const from = document.querySelector(`.Cell[data-loc="${move.from}"]`);
    const to = document.querySelector(`.Cell[data-loc="${move.to}"]`);

    setTimeout(() => {
      if (to.childElementCount > 0 && to.querySelector("img").getAttribute("alt").split("_")[0] !== gameState) {
        to.querySelector("img").remove();
      }
      to.appendChild(from.querySelector("img"));
      isCheck(to);
    }, 0);
  }, [gameState]);

  const handleMove = useCallback((selectedPiece, destination) => {
    
    // to check is the destination is valid or not
    // if not then remove the selected class from the selected piece and return
    if (!destination || !destination.classList.contains("canplace")) {
      if (selectedPiece) selectedPiece.querySelector("img").classList.remove('selected');
      setSelectedPiece(null);
      setDestination(null);
      return;
    }

    // if the destination is valid then move the piece to the destinations
    if (destination !== null) {
      setTimeout(() => {
        if (destination.childElementCount > 0 && destination.querySelector("img").getAttribute("alt").split("_")[0] != gameState) {
          destination.querySelector("img").remove();
        }
        destination.appendChild(selectedPiece.querySelector("img"));
        isCheck(destination);

        let a = chessMiniMax(document.querySelectorAll('.Cell'), 3, gameState, -Infinity, Infinity);
        console.log(a);

      }, 0);
      if (selectedPiece) selectedPiece.querySelector("img").classList.remove('selected');
    }

    if (selectedPiece !== null && destination !== null) {
      setSelectedPiece(null);
      setDestination(null);
      setGameState(prevState => prevState === 0 ? 1 : 0);
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace', 'canattack'));
    }
  }, [gameState]);

  useEffect(() => {
    if (player != gameState) {
      return;
    }

    if (selectedPiece !== null && gameState != selectedPiece?.querySelector("img")?.getAttribute("alt").split("_")[0]) {
      return;
    }

    if (selectedPiece !== null && destination === null) {
      selectedPiece?.querySelector("img").classList.add('selected');
      document.querySelectorAll('.Cell').forEach(cell => cell.classList.remove('canplace'));
      AvailableMove(selectedPiece);
    }

    if (selectedPiece !== null && destination !== null) {
      handleMove(selectedPiece, destination);
      const move = {
        from: selectedPiece.getAttribute("data-loc"),
        to: destination.getAttribute("data-loc"),
        piece: selectedPiece.querySelector("img").getAttribute("alt"),
        gameState: gameState
      };
      const roomID = window.localStorage.getItem('roomId');
      const userID = window.localStorage.getItem('userId');
      Move(roomID, userID, move);
    }

  }, [selectedPiece, destination, gameState, player, handleMove]);

  return (
    
    <div className="Board">
      {(player==0?["8", "7", "6", "5", "4", "3", "2", "1"]:["1","2","3","4","5","6","7","8"]).map((row) => (
        <div className='Row' key={row} data-loc={row}>
          {(player==0?["a", "b", "c", "d", "e", "f", "g", "h"]:["h","g","f","e","d","c","b","a"]).map((col) => (
            <Cell key={col + row} loc={col + row} gameState={gameState} setDestinationCell={setDestination} setSelectedPiece={setSelectedPiece} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;