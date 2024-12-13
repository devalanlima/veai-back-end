import express from 'express';
import { getSuggestions } from '../controllers/suggestionsControllers';

const router = express.Router();

router.get('/suggestions', getSuggestions);

export default router;
