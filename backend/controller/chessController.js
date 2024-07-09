// make me a controller for chess with socket and express

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import dbConnect from '../models/dbconnect.js';
import Game from "../models/Games/game.model.js";

dotenv.config();
dbConnect();

// Initiate game
const 