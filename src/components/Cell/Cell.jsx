import React from 'react';
import '../../css/Cell.css';

function Cell({ children, loc, setSelectedPiece, setDestinationCell, gameState }) {

  const handleClick = (target) => {

    // Check if the target is a cell or a piece
    if (target.classList.contains('Cell') === false) {
      target = target.closest('.Cell');
    }

    // stop user from selecting the same piece again
    if (target.childElementCount !== 0 && target.querySelector("img").classList.contains("selected")) {
      return;
    }

    // Check if a piece is selected and the target cell is empty
    if (document.querySelector('.selected') === null && target.childElementCount === 0) {
      console.log('No piece selected');
      return;
    }

    // Check if the target cell is not empty and the piece in the target cell is of the same color as the selected piece then kill the piece
    if (gameState != target.querySelector('img')?.getAttribute('alt').split('_')[0] && target.classList.contains('canattack') === true) {
      setDestinationCell(target);
      return;
    }

    // Remove 'selected' class from all cells
    document.querySelectorAll('.Cell img').forEach(cell => cell.classList.remove('selected'));


    // Check if a piece is selected and the target cell is not empty then move the piece to the target cell
    if (document.querySelector(".selected") === null && target.childElementCount !== 0) {
      setSelectedPiece(target);
    } else {
      setDestinationCell(target);
    }

  };

  return (
    <div
      className='Cell'
      onClick={({ target }) => {
        handleClick(target);
      }}
      data-loc={loc}
      data-label={loc.split('')[0]}
    >
      {children}
    </div>
  );
}

export default Cell;
