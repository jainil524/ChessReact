function boardStateToBoard(boardState: BoardState): Board {
  const board: Board = [];
  for (let i = 0; i < boardState.length; i++) {
    const row: Row = [];
    for (let j = 0; j < boardState[i].length; j++) {
      row.push({
        value: boardState[i][j],
        row: i,
        col: j,
      });
    }
    board.push(row);
  }
  return board;
}