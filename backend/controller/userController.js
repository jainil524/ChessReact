import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import generateUUID from '../utils/generateUUID.js';

import dbConnect from '../models/dbconnect.js';
import User from "../models/Users/user.model.js";

dotenv.config();
dbConnect();

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = { username, password, email };

    let result = await createUser(user);
    if (result.status === "error") {
        return res.status(400).json(result);
    }

    return res.status(201).json({ status: "success", data: { message: 'User registered successfully', }, hasData: true });
});

// Validate token
const tokenValidate = asyncHandler(async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: "error", data: { message: 'Access denied' }, hasData: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['RS256'] });
        return res.status(200).json({ status: "success", data: { message: 'Token is valid' }, hasData: false });
    } catch (e) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid token' }, hasData: false });
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ status: "error", data: { message: 'No user founded with this credentials' }, hasData: false });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (!isPasswordSame) {
            console.log(`Invalid password for user: ${username}`);
            return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
        }

        const token = generateJWTToken(user);
        return res.json({ status: "success", data: { message: 'Login successful', token: token }, hasData: true });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: "error", data: { message: 'Internal server error' }, hasData: false });
    }
});

// Logout user
const logout = asyncHandler(async (req, res) => {
    // Invalidate token logic here (if using token blacklist)


    return res.status(200).json({ status: "success", data: { message: 'Logged out successfully' }, hasData: false });
});

// Get own details
const getOwnDetails = asyncHandler(async (req, res) => {
    const username = req.user.username;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ status: "error", data: { message: "Invalid username" }, hasData: false });


    let userDetails = {
        username: user.username,
        email: user.email,
        userid: user.userid,
        chessStats: user.chessStats
    };


    return res.json({ status: "success", data: { message: "Your detailes found", user: userDetails }, hasData: true });
});

// Get user details by username
const getUserDetails = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ status: "error", data: { message: "Invalid username" }, hasData: false });


    let userDetails = {
        username: user.username,
        email: user.email,
        userid: user.userid,
        chessStats: user.chessStats
    };


    return res.json({ status: "success", data: { message: "other user's detailes found", user: userDetails }, hasData: true });

});

// Get chess stats for a user
const getChessStats = asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ status: "error", data: { message: "Unable to fetch the details..." }, hasData: false });

    return res.json({ status: "success", data: { message: "Your chess stats found", chessStats: user.chessStats }, hasData: true });
});

const updateProfile = asyncHandler(async (req, res) => {
    // Logic to update profile
    return res.send('Profile updated');
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ status: "success", data: { message: "Password changed successfully" }, hasData: false });
});

const deleteAccount = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    await user.remove();

    return res.json({ status: "success", data: { message: "Account deleted successfully" }, hasData: false });
});

const generateJWTToken = (user) => {
    const token = jwt.sign({ username: user.username, email: user.email, id: user.userid }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
};

const invalidateToken = (token) => {
    // Logic to invalidate token

};

const createUser = async ({ username, email, password }) => {
    let userid = generateUUID();
    let isUnique = false;

    do {
        let isUserIDUnique = await User.findOne({ userid });
        if (!isUserIDUnique) {
            isUnique = true;
        } else {
            userid = generateUUID();
        }

    } while (isUnique != true);

    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });

    if (usernameExists) {
        return { status: "error", data: { message: 'Username already exists' }, hasData: false };
    }

    if (emailExists) {
        return { status: "error", data: { message: 'Email already exists' }, hasData: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ userid, username, password: hashedPassword, email });
    return user.save();
}


export {
    register,
    tokenValidate,
    login,
    logout,
    getOwnDetails,
    getUserDetails,
    getChessStats,
    updateProfile,
    changePassword,
    deleteAccount
};
