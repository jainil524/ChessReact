import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameid: { type: String,required: true, unique: true},
    gameType: { type: String, enum: ['p2p', 'p2c'], required: true},
    players: {
        white: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        black: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    boardState: { type: String, default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' },
    turn: { type: String, enum: ['white', 'black'], default: 'white' },
    status: { type: String, enum: ['in-progress', 'check', 'double-check', 'checkmate', 'stalemate', 'completed'], default: 'in-progress' },
    moves: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true },
            piece: { type: String, required: true },
            captured: { type: String }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
