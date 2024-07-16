import BlackPawn from '/Pieces/1_Pawn.svg';
import WhitePawn from '/Pieces/0_Pawn.svg';

import BlackRook from '/Pieces/1_Rook.svg';
import WhiteRook from '/Pieces/0_Rook.svg';

import BlackKnight from '/Pieces/1_Knight.svg';
import WhiteKnight from '/Pieces/0_Knight.svg';

import BlackBisop from '/Pieces/1_Bisop.svg';
import WhiteBisop from '/Pieces/0_Bisop.svg';

import BlackQueen from '/Pieces/1_Queen.svg';
import WhiteQueen from '/Pieces/0_Queen.svg';

import BlackKing from '/Pieces/1_King.svg';
import WhiteKing from '/Pieces/0_King.svg';


export default function convertCharToPiece(piece: String) {

    if (piece === null) return null;

    // get piece ascii code
    const pieceCode = piece.charCodeAt(0);

    // check if piece is white or black
    if (pieceCode >= 97 && pieceCode <= 122) {
        switch (pieceCode) {
            case 112: {
                return BlackPawn;
            }
            case 114: {
                return BlackRook;
            }
            case 110: {
                return BlackKnight;
            }
            case 98: {
                return BlackBisop;
            }
            case 113: {
                return BlackQueen;
            }
            case 107: {
                return BlackKing;
            } 
            default: {
                return null;

            }
        }
    }

    else {
        switch (pieceCode) {
            case 80: {
                return WhitePawn;
            }
            case 82: {
                return WhiteRook;
            }
            case 78: {
                return WhiteKnight;
            }
            case 66: {
                return WhiteBisop;
            }
            case 81: {
                return WhiteQueen;
            }
            case 75: {
                return WhiteKing;
            }
            default: {
                return null;

            }
        }
    }
}
