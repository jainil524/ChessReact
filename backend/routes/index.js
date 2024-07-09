import { Router } from 'express';
import userRoutes from './userRoutes.js';
import gameRoutes from './gameRoutes.js';
import authenticateToken from '../middleware/userAuth.js';

const app = Router();

// Public routes
app.use('/user', userRoutes);

// Protected routes
app.use('/game', authenticateToken, gameRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    try {
        console.error(err);
        res.stutus(500).json({ status: 500, message: "Internal server error" });
        next();
    } catch (err) {
        console.log(err);
        res.status = 500;
        res.send(JSON.stringify({ status: 500, data: { message: "Internal server error" } }));
    }

});


export default app;