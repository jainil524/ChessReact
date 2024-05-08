export default function AvailableMove(piece) {
    let row = piece.getAttribute("data-loc").split("")[1];
    let col = piece.getAttribute("data-loc").split("")[0];
    let [piecetype, piecename] = piece.querySelector("img").getAttribute("alt").split("_");

    switch (piecename) {
        case "pawn":
            Pawn(piecetype, col, row);
            break;
        case "horse":
            Horse(piecetype, col, row);
            break;
        case "queen":
            Queen(piecetype, col, row);
            break;
        case "elephant":
            Elephant(piecetype, col, row);
            break;
        case "cemal":
            Cemal(piecetype, col, row);
            break;
        case "king":
            King(piecetype, col, row);
            break;
        default:
            break;
    }
}

function isPieceInCell(cell) {
    return cell.childElementCount > 0;
}

function isOpponentPiece(cell, piecetype) {
    let pieceInCell = cell.querySelector("img");
    let opponentPiecetype = piecetype == 1 ? 0 : 1;
    return pieceInCell.getAttribute("alt").startsWith(opponentPiecetype);
}


function Pawn(piecetype, col, row) {
    let direction = piecetype == 1 ? -1 : 1;
    let frontCell = document.querySelector(`.Cell[data-loc="${col}${parseInt(row) + direction}"]`);
    let twoStepsFrontCell = document.querySelector(`.Cell[data-loc="${col}${parseInt(row) + 2 * direction}"]`);

    if (!isPieceInCell(frontCell)) {
        frontCell?.classList.add("canplace");
        if (!isPieceInCell(twoStepsFrontCell) && (piecetype == 1 && row === "7" || piecetype == 0 && row === "2")) {
            twoStepsFrontCell?.classList.add("canplace");
        }
    }

    // Check for capturing moves diagonally
    let leftDiagonalCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(col.charCodeAt(0) - 1)}${parseInt(row) + direction}"]`);
    let rightDiagonalCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(col.charCodeAt(0) + 1)}${parseInt(row) + direction}"]`);
    if (leftDiagonalCell && isPieceInCell(leftDiagonalCell) && isOpponentPiece(leftDiagonalCell, piecetype)) {
        leftDiagonalCell.classList.add("canplace");
        leftDiagonalCell.classList.add("canattack");
    }
    if (rightDiagonalCell && isPieceInCell(rightDiagonalCell) && isOpponentPiece(rightDiagonalCell, piecetype)) {
        rightDiagonalCell.classList.add("canplace");
        rightDiagonalCell.classList.add("canattack");
    }
}

function Horse(piecetype, col, row) {
    let possibleMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    possibleMoves.forEach(move => {
        let [dx, dy] = move;
        let nextX = col.charCodeAt(0) + dx;
        let nextY = parseInt(row) + dy;
        if (nextX >= 97 && nextX <= 104 && nextY >= 1 && nextY <= 8) {
            let nextCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(nextX)}${nextY}"]`);
            console.log(nextCell);
            if (!isPieceInCell(nextCell)) {
                nextCell?.classList.add("canplace");
            } else if (isOpponentPiece(nextCell, piecetype)) {
                nextCell.classList.add("canplace");
                nextCell.classList.add("canattack");
            }
        }
    });
}

function Queen(piecetype, col, row) {
    let directions = [
        [1, 1], [1, -1], [-1, 1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    directions.forEach(direction => {
        let [dx, dy] = direction;
        let nextX = col.charCodeAt(0) + dx;
        let nextY = parseInt(row) + dy;
        while (nextX >= 97 && nextX <= 104 && nextY >= 1 && nextY <= 8) {
            let nextCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(nextX)}${nextY}"]`);
            if (!isPieceInCell(nextCell)) {
                nextCell?.classList.add("canplace");
            } else if (isOpponentPiece(nextCell, piecetype)) {
                nextCell.classList.add("canplace");
                nextCell.classList.add("canattack");
                break;
            } else {
                break;
            }
            nextX += dx;
            nextY += dy;
        }
    });
}

function Elephant(piecetype, col, row) {
    let directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    directions.forEach(direction => {
        let [dx, dy] = direction;
        let nextX = col.charCodeAt(0) + dx;
        let nextY = parseInt(row) + dy;
        while (nextX >= 97 && nextX <= 104 && nextY >= 1 && nextY <= 8) {
            let nextCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(nextX)}${nextY}"]`);
            if (!isPieceInCell(nextCell)) {
                nextCell?.classList.add("canplace");
            } else if (isOpponentPiece(nextCell, piecetype)) {
                nextCell.classList.add("canplace");
                nextCell.classList.add("canattack");

                break;
            } else {
                break;
            }
            nextX += dx;
            nextY += dy;
        }
    });
}

function Cemal(piecetype, col, row) {
    let directions = [
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    directions.forEach(direction => {
        let [dx, dy] = direction;
        let nextX = col.charCodeAt(0) + dx;
        let nextY = parseInt(row) + dy;
        while (nextX >= 97 && nextX <= 104 && nextY >= 1 && nextY <= 8) {
            let nextCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(nextX)}${nextY}"]`);
            if (!isPieceInCell(nextCell)) {
                nextCell?.classList.add("canplace");
            } else if (isOpponentPiece(nextCell, piecetype)) {
                nextCell.classList.add("canplace");
                nextCell.classList.add("canattack");

                break;
            } else {
                break;
            }
            nextX += dx;
            nextY += dy;
        }
    });
}

function King(piecetype, col, row) {
    let directions = [
        [1, 1], [1, -1], [-1, 1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    directions.forEach(direction => {
        let [dx, dy] = direction;
        let nextX = col.charCodeAt(0) + dx;
        let nextY = parseInt(row) + dy;
        if (nextX >= 97 && nextX <= 104 && nextY >= 1 && nextY <= 8) {
            let nextCell = document.querySelector(`.Cell[data-loc="${String.fromCharCode(nextX)}${nextY}"]`);
            if (!isPieceInCell(nextCell)) {
                nextCell?.classList.add("canplace");
            } else if (isOpponentPiece(nextCell, piecetype)) {
                nextCell.classList.add("canplace");
                nextCell.classList.add("canattack");

            }
        }
    });
}
