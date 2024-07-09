// routes/gameRoutes.js
import { Router } from 'express';
const gameRoutes = Router();

import {
    initiateGame,
    createPrivateGame,
    joinPrivateGame,
    makeMove,
    getGameState,
    getGameAnalytics

} from "../controller/gameController.js";

gameRoutes.post('/initiateGame', initiateGame);
gameRoutes.post('/createPrivateGame', createPrivateGame);
gameRoutes.post('/joinPrivateGame', joinPrivateGame);
gameRoutes.post('/move', makeMove);
gameRoutes.get('/getGameState/:gameId', getGameState);
gameRoutes.get('/getGameAnalytics/:gameId', getGameAnalytics);

export default gameRoutes;
