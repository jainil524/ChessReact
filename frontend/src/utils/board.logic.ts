// this is the master function that will return all the valid moves for a piece
export function validMoves(piece: string, boardState: string[][], player: number, pieceLocation: any): Array<string> {

    const Moves: Array<string> = [];

    console.log(pieceLocation, piece, boardState, player ? "white" : "black", "pieceLocation, piece, boardState, player");

    if (pieceLocation === -1) {
        return [];
    }

    let [char, num] = pieceLocation.split("");
    let pieceMoves = getPieceMoves(piece);
    num = parseInt(num);
    if (piece.toLowerCase() === 'p') {
        Moves.push(...generatePawnMove(char, num, player, pieceMoves));
    }

    else if (piece.toLowerCase() === 'r') {
        Moves.push(...generateRookMove(char, num, player, pieceMoves, boardState));
    }

    else if (piece.toLowerCase() === 'n') {
        Moves.push(...generateKnightMove(char, num, player, pieceMoves));
    }

    else if (piece.toLowerCase() === 'b') {
        Moves.push(...generateBishopMove(char, num, player, pieceMoves, boardState));
    }

    else if (piece.toLowerCase() === 'q') {
        Moves.push(...generateQueenMove(char, num, player, pieceMoves, boardState));
    }

    else if (piece.toLowerCase() === 'k') {
        Moves.push(...generateKingMove(char, num, player, pieceMoves));
    }

    let validMoves = canMove(Moves, boardState, pieceLocation);

    return validMoves;
}

export function performMoves(piece: String, boardState: String[][], moves: Array<Array<String>>) {
    let newBoardState = boardState.map(row => [...row]);
    let pieceLocation = boardState.findIndex(row => row.includes(piece));
    let row = boardState[pieceLocation];
    let column = row.indexOf(piece);

    moves.forEach((move) => {
        let [newRow, newColumn]: any = (move[0].split(":")[1]).split("");
        newBoardState["abcdefgh".indexOf(newRow)][newColumn] = piece;
        newBoardState[pieceLocation][column] = ' ';
    });

    return newBoardState;
}

// this function will return all the possible moves for a piece based on the piece type
const getPieceMoves = (piece: string): Array<Array<number>> => {
    let moves: Array<Array<number>> = [];

    switch (piece.toLowerCase()) {
        case 'p': // pawn moves
            moves = [[0, 1], [1, 1], [-1, 1]];
            // Initial double move for pawn
            moves.push([0, 2]);
            break;

        case 'r': // rook moves
            for (let i = 1; i < 8; i++) {
                moves.push([0, i]); // vertical
                moves.push([i, 0]); // horizontal
            }
            break;

        case 'n': // knight moves
            moves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            break;

        case 'b': // bishop moves
            for (let i = 1; i < 8; i++) {
                moves.push([i, i]);   // diagonals
                moves.push([i, -i]);
                moves.push([-i, i]);
                moves.push([-i, -i]);
            }
            break;

        case 'q': // queen moves
            for (let i = 1; i < 8; i++) {
                moves.push([0, i]); // vertical
                moves.push([i, 0]); // horizontal
                moves.push([i, i]); // diagonals
                moves.push([i, -i]);
                moves.push([-i, i]);
                moves.push([-i, -i]);
            }
            break;

        case 'k': // king moves
            moves = [
                [0, 1], [0, -1], [1, 0], [-1, 0],
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            break;

        default:
            break;
    }

    return moves;
}


// this function will generate all the possible moves for a pawn 
const generatePawnMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>): Array<string> => {

    let Moves: Array<string> = [];
    if (player == 1) {

        if (num == 2) {
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num + 1) + "")));
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num + 2) + "")));
        } else {
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num + 1) + "")));
        }
    } else {
        if (num == 7) {
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num - 1) + "")));
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num - 2) + "")));
        } else {
            Moves.push((char.concat(num + "")) + ":" + (char.concat((num - 1) + "")));
        }
    }

    return Moves;
}

// this function will generate all the possible moves for a rook
const generateRookMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>, boardState: string[][]): Array<string> => {
    let Moves: Array<string> = [];

    let row = "abcdefgh";
    let column = "12345678";

    let rowindex = row.indexOf(char);
    let colindex = column.indexOf(num.toString());

    for (let move of pieceMoves) {
        let newRow = rowindex + move[0];
        let newColumn = colindex + move[1];

        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            if (boardState[newColumn][newRow] !== "") {
                if (boardState[newColumn][newRow].charAt(0) !== boardState[colindex][rowindex].charAt(0)) {
                    Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
                }
                break;
            } else {
                Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
            }
        }
    }

    return Moves;
}

// this function will generate all the possible moves for a knight
export const generateKnightMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>): Array<string> => {

    let Moves: Array<string> = [];

    let row = "abcdefgh";
    let column = "12345678";

    let rowindex = row.indexOf(char);
    let colindex = column.indexOf(num.toString());

    for (let move of pieceMoves) {
        let newRow = rowindex + move[0];
        let newColumn = colindex + move[1];

        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            if (boardState[newColumn][newRow] === "" || boardState[newColumn][newRow].charAt(0) !== boardState[colindex][rowindex].charAt(0)) {
                Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
            }
        }
    }

    return Moves;
}

// this function will generate all the possible moves for a bishop
const generateBishopMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>, boardState: string[][]): Array<string> => {
    let Moves: Set<string> = new Set();

    let row = "abcdefgh";
    let column = "12345678";

    let rowindex = row.indexOf(char);
    let colindex = column.indexOf(num.toString());

    console.log("Bishop Moves", pieceMoves);
    

    for (let move of pieceMoves) {
        let newRow = rowindex + move[0];
        let newColumn = colindex + move[1];

        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            if (boardState[newColumn][newRow] !== "") {
                if (boardState[newColumn][newRow].charAt(0) !== boardState[colindex][rowindex].charAt(0)) {
                    Moves.add((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
                }
                break;
            } else {
                Moves.add((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
            }
        }
    }

    let arrayOfMoves = Array.from(Moves);
    console.log(arrayOfMoves    , "Bishop Moves");

    // set to array
    return Array.from(arrayOfMoves);   
}

// this function will generate all the possible moves for a queen
const generateQueenMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>, boardState: string[][]): Array<string> => {
    let Moves: Array<string> = [];

    let row = "abcdefgh";
    let column = "12345678";

    let rowindex = row.indexOf(char);
    let colindex = column.indexOf(num.toString());

    for (let move of pieceMoves) {
        let newRow = rowindex + move[0];
        let newColumn = colindex + move[1];

        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            if (boardState[newColumn][newRow] !== "") {
                if (boardState[newColumn][newRow].charAt(0) !== boardState[colindex][rowindex].charAt(0)) {
                    Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
                }
                break;
            } else {
                Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
            }
        }
    }

    return Moves;
}

// this function will generate all the possible moves for a king
const generateKingMove = (char: string, num: number, player: number, pieceMoves: Array<Array<number>>): Array<string> => {
    let Moves: Array<string> = [];

    let row = "abcdefgh";
    let column = "12345678";

    let rowindex = row.indexOf(char);
    let colindex = column.indexOf(num.toString());

    for (let move of pieceMoves) {
        let newRow = rowindex + move[0];
        let newColumn = colindex + move[1];

        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            Moves.push((char.concat(num + "")) + ":" + (row[newRow].concat(column[newColumn])));
        }
    }

    return Moves;
}

const canMove = (moves: Array<string>, boardState: string[][], pieceLocation: any): Array<string> => {
    let validMoves = [];

    // check whether the piece can move to the destination cell or not
    for (let move of moves) {
        let [_, to] = move.split(":");

        let [toChar, toNum] = to.split("");

        let toRow = "abcdefgh".indexOf(toChar);
        let toColumn = 8 - parseInt(toNum);

        if (boardState[toColumn][toRow] === "") {
            validMoves.push(move);
        }
    }

    return validMoves;
}
