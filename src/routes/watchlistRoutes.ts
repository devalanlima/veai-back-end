import express from 'express';
import { getWatchlist } from '../controllers/watchlistController';

const router = express.Router();

router.get('/watchlist', getWatchlist);

export default router;
