import { boardStateDecoder, boardStateEncoder } from "../utils/BoardStateParser";
import convertCharToPiece from "../utils/convertCharToPiece";

export class Player {
    username: String;
    score: Number;
    constructor(username: String) {
        this.username = username;
        this.score = 0;
    }
}

export default class Board {
    gameId: string;
    players: Array<Player>;
    state: string;
    moves: Array<String> = [];

    constructor(players: Array<Player>) {
        this.gameId = Math.random().toString(36).substring(7);
        this.players = players.map(player => new Player(player.username));
        this.state = Board.getInitialBoardState();
    }

    getPlayer(username = null): Array<Player> {
        if (username) {
            return this.players.filter(player => player.username === username);
        }

        return this.players;
    }

    static getInitialBoardState(): String {
        // return the initial board state string
        return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    }

    static covertToPiece(piece: String): any {
        return convertCharToPiece(piece);
    }

    move(from: String, to: String): void {
        // move the piece from the `from` cell to the `to` cell
        // update the board state

        let boardstate: String[][] = boardStateDecoder(this.state);

        let fromx = from.charCodeAt(0) - 97;
        let fromy = 8 - parseInt(from.charAt(1));

        let tox = to.charCodeAt(0) - 97;
        let toy = 8 - parseInt(to.charAt(1));

        let piece = boardstate[fromy][fromx];
        boardstate[fromy][fromx] = "";
        boardstate[toy][tox] = piece;

        this.state = boardStateEncoder(boardstate);

        this.moves.push(from + ":" +to);
    }

}