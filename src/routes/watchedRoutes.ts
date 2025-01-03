import express from 'express';
import { getWatched, insertWatched } from '../controllers/watchedControllers';

const router = express.Router();

router.get('/watched', getWatched);
router.post('/watched', insertWatched);

export default router;
