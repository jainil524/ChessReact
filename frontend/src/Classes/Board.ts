export class Player {
    username: String;
    score: Number;
    constructor(username: String) {
        this.username = username;
        this.score = 0;
    }
}

export default class Board {
    gameId: String;
    players: Array<Player>;
    state: String;

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

    static convertBoardStateToPiece(piece){
        
    }

}