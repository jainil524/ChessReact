// routes/userRoutes.js
import { Router } from 'express';

import authenticateToken from '../middleware/userAuth.js';

const userRoutes = Router();

import {
    register,
    login,
    logout,
    tokenValidate,
    getOwnDetails,
    getUserDetails,
    getChessStats,
    updateProfile,
    changePassword,
    deleteAccount
} from '../controller/userController.js';

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/logout', logout);
userRoutes.get('/tokenValidate', authenticateToken, tokenValidate);
userRoutes.get('/getOwnDetails', authenticateToken, getOwnDetails);
userRoutes.get('/getUserDetails/:username', authenticateToken, getUserDetails);
userRoutes.get('/getChessStats', authenticateToken, getChessStats);
userRoutes.put('/updateProfile', authenticateToken, updateProfile);
userRoutes.put('/changePassword', authenticateToken, changePassword);
userRoutes.delete('/deleteAccount', authenticateToken, deleteAccount);


export default userRoutes;
