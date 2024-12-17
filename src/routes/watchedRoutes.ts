import express from 'express';
import { getWatched } from '../controllers/watchedControllers';

const router = express.Router();

router.get('/watched', getWatched);

export default router;
