export default function chessMiniMax(board, depth, isMaximizingPlayer, alpha, beta) {
  if (depth === 0) {
    return evaluateBoard(board);
  }

  let bestMove = null;
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;

  const possibleMoves = getAllPossibleMoves(board, isMaximizingPlayer);
  for (let i = 0; i < possibleMoves.length; i++) {
    const move = possibleMoves[i];
    const newBoard = makeMove(board, move);
    const score = chessMiniMax(newBoard, depth - 1, !isMaximizingPlayer, alpha, beta);

    if (isMaximizingPlayer) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return depth === 3 ? bestMove : bestScore;
}

function evaluateBoard(board) {
  let score = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece === null) {
        continue;
      }
      const value = pieceValue(piece);
      score += piece.color === 'white' ? value : -value;
    }
  }
  return score;
}

function pieceValue(piece) {
  switch (piece.type) {
    case 'pawn':
      return 10;
    case 'knight':
      return 30;
    case 'bishop':
      return 30;
    case 'rook':
      return 50;
    case 'queen':
      return 90;
    case 'king':
      return 900;
    default:
      return 0;
  }
}

function getAllPossibleMoves(board, isMaximizingPlayer) {
  const possibleMoves = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece === null || piece.color !== (isMaximizingPlayer ? 'white' : 'black')) {
        continue;
      }
      const moves = getPieceMoves(board, piece, i, j);
      for (let k = 0; k < moves.length; k++) {
        possibleMoves.push({ from: [i, j], to: moves[k] });
      }
    }
  }
  return possibleMoves;
}

function makeMove(board, move) {
  const newBoard = board.map(row => row.slice());
  const piece = newBoard[move.from[0]][move.from[1]];
  newBoard[move.from[0]][move.from[1]] = null;
  newBoard[move.to[0]][move.to[1]] = piece;
  return newBoard;
}

