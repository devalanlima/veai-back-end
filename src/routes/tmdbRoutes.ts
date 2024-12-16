import express from 'express';
import { getPopularMovies } from '../controllers/tmdbControllers';

const router = express.Router();

router.get('/popular', getPopularMovies);

export default router;
