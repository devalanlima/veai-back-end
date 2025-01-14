import express from 'express';
import {
  getSuggestions,
  insertSuggestion,
} from '../controllers/suggestionsControllers';

const router = express.Router();

router.get('/suggestions', getSuggestions);
router.post('/suggestions', insertSuggestion);

export default router;
