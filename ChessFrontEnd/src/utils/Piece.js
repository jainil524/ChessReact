import BlackElephant from '/Pieces/1_Elephant.svg';
import BlackCemal from '/Pieces/1_Cemal.svg';
import BlackHorse from '/Pieces/1_Horse.svg';
import BlackKing from '/Pieces/1_King.svg';
import BlackQueen from '/Pieces/1_Queen.svg';
import BlackPawn from '/Pieces/1_Pawn.svg';
import WhiteElephant from '/Pieces/0_Elephant.svg';
import WhiteCemal from '/Pieces/0_Cemal.svg';
import WhiteHorse from '/Pieces/0_Horse.svg';
import WhiteKing from '/Pieces/0_King.svg';
import WhiteQueen from '/Pieces/0_Queen.svg';
import WhitePawn from '/Pieces/0_Pawn.svg';



const pieces = [
    { piece: "1_elephant", Image: BlackElephant, position: 'a8' },
    { piece: "1_cemal", Image: BlackCemal, position: 'b8' },
    { piece: "1_horse", Image: BlackHorse, position: 'c8' },
    { piece: "1_king", Image: BlackKing, position: 'd8' },
    { piece: "1_queen", Image: BlackQueen, position: 'e8' },
    { piece: "1_horse", Image: BlackHorse, position: 'f8' },
    { piece: "1_cemal", Image: BlackCemal, position: 'g8' },
    { piece: "1_elephant", Image: BlackElephant, position: 'h8' },
    { piece: "1_pawn", Image: BlackPawn, position: 'a7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'b7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'c7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'd7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'e7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'f7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'g7' },
    { piece: "1_pawn", Image: BlackPawn, position: 'h7' },
    { piece: "0_elephant", Image: WhiteElephant, position: 'a1' },
    { piece: "0_cemal", Image: WhiteCemal, position: 'b1' },
    { piece: "0_horse", Image: WhiteHorse, position: 'c1' },
    { piece: "0_king", Image: WhiteKing, position: 'd1' },
    { piece: "0_queen", Image: WhiteQueen, position: 'e1' },
    { piece: "0_horse", Image: WhiteHorse, position: 'f1' },
    { piece: "0_cemal", Image: WhiteCemal, position: 'g1' },
    { piece: "0_elephant", Image: WhiteElephant, position: 'h1' },
    { piece: "0_pawn", Image: WhitePawn, position: 'a2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'b2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'c2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'd2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'e2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'f2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'g2' },
    { piece: "0_pawn", Image: WhitePawn, position: 'h2' },
];

export function makePiece({ piece, Image }){
    return `<img src='${Image}' alt='${piece}' />`;
};
  
export default pieces;