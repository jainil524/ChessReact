import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const userSchema = new Schema({
    userid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    chessStats: {
        gamesPlayed: { type: Number, default: 0 },
        gamesWon: { type: Number, default: 0 },
        gamesLost: { type: Number, default: 0 },
        gamesDrawn: { type: Number, default: 0 }
    }
});

const User = model('User', userSchema);

export default User;