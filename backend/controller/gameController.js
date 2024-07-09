import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import generateUUID from '../utils/generateUUID.js';

import dbConnect from '../models/dbconnect.js';
import Game from "../models/Games/game.model.js";

dotenv.config();
dbConnect();

// Initiate game
const initiateGame = asyncHandler(async (req, res) => {
    const { gameType } = req.body;
    let gameid = generateUUID(6);
    let isFinalized = false;

    do {
        const game = await Game.findOne({ gameid });

        if (!game) {
            isFinalized = true;
        }
    } while (isFinalized != true);



    const game = new Game({
        gameType,
        players: {
            white: req.user._id,
            black: null
        }
    });

    const newGame = await game.save();

    res.status(201).json({ status: "success", data: { message: "Game created successfully", game: newGame }, hasData: true });
});

// Join private game
const joinPrivateGame = asyncHandler(async (req, res) => {

});

// Create private game
const createPrivateGame = asyncHandler(async (req, res) => {


});

const makeMove = asyncHandler(async (req, res) => {

});

const getGameState = asyncHandler(async (req, res) => {

});

const getGameAnalytics = asyncHandler(async (req, res) => {

});

export {
    initiateGame,
    joinPrivateGame,
    createPrivateGame,
    makeMove,
    getGameState,
    getGameAnalytics
};
