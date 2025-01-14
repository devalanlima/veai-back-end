import express from 'express';
import {
  getWatchlist,
  insertWatchlist,
} from '../controllers/watchlistController';

const router = express.Router();

router.get('/watchlist', getWatchlist);
router.post('/watchlist', insertWatchlist);

export default router;
